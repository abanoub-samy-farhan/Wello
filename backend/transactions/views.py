from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Transaction
from payment_methods.models import PaymentMethod, Accounts
from .serializers import TransactionSerializer

# Create your views here.

class TransactionByUserId(APIView):
    def get(self, request):
        user_id = request.user_id
        transactions = Transaction.objects.filter(user_id=user_id)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateTransaction(APIView):
    def post(self, request):
        user_id = request.user_id
        request.data['user_id'] = user_id
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class TransactionResolveRequest(APIView):
    def post(self, request):
        transaction_id = request.data.get('transaction_id')
        transaction = Transaction.objects.get(id=transaction_id)
        if transaction.status == 'Pending' and transaction.transaction_type == 'Request':
            sender = transaction.user_id
            recipient = transaction.recipient_id
            amount = transaction.amount
            
            # Retrieve primary payment method
            try:
                primary_payment_method = PaymentMethod.objects.get(user_id=sender.id, is_primary=True)
            except PaymentMethod.DoesNotExist:
                primary_payment_method = None
            


            # Check if primary payment method exists
            if not primary_payment_method:
                return Response('Primary payment method not found', status=status.HTTP_400_BAD_REQUEST)
            primary_payment_method_balance = Accounts.get_primary_account_balance(primary_payment_method.id)


            # Check if sender has enough balance
            if primary_payment_method_balance < amount:
                transaction.status = 'Failed'
                transaction.save()
                return Response('Insufficient balance', status=status.HTTP_400_BAD_REQUEST)
            
            try:
                primary_payment_recipient = PaymentMethod.objects.get(user_id=recipient.id, is_primary=True)
            except PaymentMethod.DoesNotExist:
                primary_payment_recipient = None

            if not primary_payment_recipient:
                transaction.status = 'Failed'
                transaction.save()
                return Response('Recipient primary payment method not found', status=status.HTTP_400_BAD_REQUEST)
            

            confirm_transaction = Accounts.withdraw_from_account(primary_payment_method.id, amount)
            confirm_recieve = Accounts.top_up_account(primary_payment_recipient.id, amount)
            print(confirm_transaction, confirm_recieve)
            if confirm_transaction and confirm_recieve:
                transaction.status = 'Success'
                transaction.description = 'Request resolved'
                transaction.balance = Accounts.get_balance(sender.id)
                transaction.save()
                recieve_transaction = Transaction.objects.create(
                    user_id=recipient,
                    amount=amount,
                    transaction_type='Receive',
                    balance = Accounts.get_balance(recipient.id),
                    recipient_id=sender,
                    status='Success',
                    description='Request resolved'
                )
                return Response('Request resolved', status=status.HTTP_200_OK)
            else:
                transaction.status = 'Failed'
                transaction.save()
                return Response('Transaction failed', status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response('Transaction is invalid', status=status.HTTP_400_BAD_REQUEST)