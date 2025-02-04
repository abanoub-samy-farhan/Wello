from django.db import transaction as db_transaction
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Transaction
from notifications.models import Notification
from payment_methods.models import PaymentMethod, Account
from .serializers import TransactionSerializer


class TransactionByUserId(APIView):
    """View for listing user transactions with filtering and ordering options."""
    
    
    def get(self, request):
        """Get user's transactions with optional filtering.
        
        Query Parameters:
        - type: Filter by transaction type (purchase, send, receive)
        - status: Filter by status (pending, success, failed)
        - start_date: Filter transactions after this date
        - end_date: Filter transactions before this date
        - ordering: Order by field (created_at, amount, status)
        """
        try:
            user_id = request.user_id
            queryset = Transaction.objects.filter(user_id=user_id)
            
            # Apply filters
            transaction_type = request.query_params.get('type')
            if transaction_type:
                queryset = queryset.filter(transaction_type=transaction_type.upper())
                
            status_filter = request.query_params.get('status')
            if status_filter:
                queryset = queryset.filter(status=status_filter.upper())
                
            start_date = request.query_params.get('start_date')
            if start_date:
                queryset = queryset.filter(created_at__gte=start_date)
                
            end_date = request.query_params.get('end_date')
            if end_date:
                queryset = queryset.filter(created_at__lte=end_date)
            
            # Apply ordering
            ordering = request.query_params.get('ordering', '-created_at')
            if ordering.lstrip('-') in ['created_at', 'amount', 'status']:
                queryset = queryset.order_by(ordering)
            
            serializer = TransactionSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An unexpected error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreateTransaction(APIView):
    """View for creating new transactions."""
    
    def post(self, request):
        """Create a new transaction.
        
        """
        try:
            request.data['user_id'] = request.user_id
            serializer = TransactionSerializer(data=request.data)
            
            if serializer.is_valid():
                with db_transaction.atomic():
                    transaction = serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TransactionResolveRequest(APIView):
    """View for resolving money request transactions."""
    
    def _decline_request(self, transaction, recipient, sender):
        """Handle request decline logic."""
        with db_transaction.atomic():
            transaction.status = Transaction.TransactionStatus.FAILED
            transaction.description = 'Request declined'
            transaction.save()
            
            Notification.objects.create(
                user_id=recipient,
                title='Request Declined',
                notification_type='Request',
                message=f'Money request was declined by {sender.full_name}'
            )
        
        return Response({'message': 'Request declined'}, status=status.HTTP_200_OK)
    
    def _process_request(self, transaction, sender, recipient, amount):
        """Process an accepted money request."""
        try:
            with db_transaction.atomic():
                # Get payment methods
                sender_method = get_object_or_404(
                    PaymentMethod,
                    user_id=sender.id,
                    is_primary=True
                )
                
                recipient_method = get_object_or_404(
                    PaymentMethod,
                    user_id=recipient.id,
                    is_primary=True
                )
                
                # Verify balance
                if Accounts.get_primary_account_balance(sender_method.id) < amount:
                    raise ValidationError('Insufficient balance')
                
                # Process transfer
                if (Accounts.withdraw_from_account(sender_method.id, amount) and
                    Accounts.top_up_account(recipient_method.id, amount)):
                    
                    # Update request transaction
                    transaction.status = Transaction.TransactionStatus.SUCCESS
                    transaction.description = 'Request fulfilled'
                    transaction.balance = Accounts.get_balance(sender.id)
                    transaction.save()
                    
                    # Create recipient's transaction record
                    Transaction.objects.create(
                        user_id=recipient,
                        amount=amount,
                        transaction_type=Transaction.TransactionType.RECEIVE,
                        recipient_id=sender,
                        status=Transaction.TransactionStatus.SUCCESS,
                        description=f'Received requested amount from {sender.full_name}',
                        balance=Accounts.get_balance(recipient.id)
                    )
                    
                    # Create notifications
                    Notification.objects.create(
                        user_id=sender,
                        title='Money Request Fulfilled',
                        notification_type='Request',
                        message=f'You have sent ${amount} to {recipient.full_name}'
                    )
                    
                    Notification.objects.create(
                        user_id=recipient,
                        title='Money Request Fulfilled',
                        notification_type='Request',
                        message=f'You have received ${amount} from {sender.full_name}'
                    )
                    
                    return Response({'message': 'Request fulfilled'}, status=status.HTTP_200_OK)
                
                raise ValidationError('Transaction processing failed')
                
        except PaymentMethod.DoesNotExist:
            return Response(
                {'error': 'Payment method not found'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        """Resolve a money request transaction.
        
        Parameters:
        - transaction_id: UUID of the request transaction
        - action: 'accept' or 'decline'
        """
        try:
            transaction = get_object_or_404(Transaction, id=request.data.get('transaction_id'))
            
            if (transaction.status != Transaction.TransactionStatus.PENDING or
                transaction.transaction_type != 'Request'):
                raise ValidationError('Invalid transaction state')
            
            sender = transaction.user_id
            recipient = transaction.recipient_id
            amount = transaction.amount
            
            # Handle decline action
            if request.data.get('action') == 'decline':
                return self._decline_request(transaction, recipient, sender)
            
            # Handle accept action
            return self._process_request(transaction, sender, recipient, amount)
            
        except Transaction.DoesNotExist:
            return Response(
                {'error': 'Transaction not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': 'An unexpected error occurred'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )