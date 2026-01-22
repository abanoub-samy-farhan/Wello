from decimal import Decimal
from django.db import transaction as db_transaction
from rest_framework import serializers
from .models import Transaction
from notifications.models import Notification
from payment_methods.models import PaymentMethod, Account

class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for handling Transaction model instances.    
    """
    
    class Meta:
        model = Transaction
        fields = '__all__'
        extra_kwargs = {
            'status': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
            'balance': {'read_only': True},
            'description': {'read_only': True},
            'recipient_id': {'required': False},
        }
    
    def validate(self, data):
        """Validate transaction data before processing."""
        transaction_type = data.get('transaction_type')
        recipient = data.get('recipient_id')
        user = data.get('user_id')
        amount = data.get('amount')
        
        if not amount or amount <= 0:
            raise serializers.ValidationError({'amount': 'Amount must be positive'})
        
        if transaction_type == Transaction.TransactionType.SEND or \
        transaction_type == Transaction.TransactionType.REQUEST:
            if not recipient:
                raise serializers.ValidationError({'recipient_id': 'Recipient is required for Send transactions'})
            if recipient == user:
                raise serializers.ValidationError({'recipient_id': 'Cannot send money to yourself'})
        
        return data

    def _process_purchase(self, user, amount, primary_method, secondary_method, validated_data):
        """Process a purchase transaction using available payment methods."""
        primary_balance = Account.get_primary_account_balance(primary_method.id)
        
        if primary_balance >= amount:
            # Use primary account only
            if Account.withdraw_from_account(primary_method.id, amount):
                return self._create_successful_purchase(user, amount, validated_data)
        elif Account.get_balance(user.id) >= amount and secondary_method:
            # Split between primary and secondary accounts
            with db_transaction.atomic():
                if (Account.withdraw_from_account(primary_method.id, primary_balance) and
                    Account.withdraw_from_account(secondary_method.id, amount - primary_balance)):
                    return self._create_successful_purchase(user, amount, validated_data)
        
        raise serializers.ValidationError('Insufficient balance or transaction failed')
    
    def _process_money_transfer(self, user, recipient, amount, primary_method, validated_data):
        """Process a money transfer between users."""
        try:
            recipient_method = PaymentMethod.objects.get(user_id=recipient.id, is_primary=True)
        except PaymentMethod.DoesNotExist:
            raise serializers.ValidationError('Recipient has no valid payment method')
        
        primary_balance = Account.get_primary_account_balance(primary_method.id)
        if primary_balance < amount:
            raise serializers.ValidationError('Insufficient balance for transfer')
        
        with db_transaction.atomic():
            if (Account.withdraw_from_account(primary_method.id, amount) and
                Account.top_up_account(recipient_method.id, amount)):
                return self._create_successful_transfer(user, recipient, amount, validated_data)
        
        raise serializers.ValidationError('Transfer failed')
    
    def _create_successful_purchase(self, user, amount, validated_data):
        """Create a successful purchase transaction record."""
        transaction_data = {
            **validated_data,
            'status': Transaction.TransactionStatus.SUCCESS,
            'balance': Account.get_balance(user.id),
            'description': f'Purchase of ${amount} from {validated_data.get("company", "unknown vendor")}'
        }
        
        transaction = Transaction.objects.create(**transaction_data)
        
        Notification.objects.create(
            user_id=user,
            title='Purchase Successful',
            notification_type='Purchase',
            message=f'Purchase of ${amount} completed successfully'
        )
        
        return transaction
    
    def _submit_money_request(self, sender, recipient, amount):
        """Create a money request transaction."""
        try:
            with db_transaction.atomic():
                transaction = Transaction.objects.create(
                    user_id=recipient,
                    amount=amount,
                    recipient_id=sender,
                    transaction_type=Transaction.TransactionType.REQUEST,
                    status=Transaction.TransactionStatus.PENDING,
                    description=f'Money request of ${amount} to {recipient.full_name}',
                    balance=Account.get_balance(sender.id)
                )
            
                Notification.objects.create(
                    user_id=recipient,
                    title='Money Request Received',
                    notification_type='Request',
                    message=f'You have received a money request of ${amount} from {sender.full_name}'
                )

                Notification.objects.create(
                    user_id=sender,
                    title='Money Request Sent',
                    notification_type='Request',
                    message=f'You have sent a money request of ${amount} to {recipient.full_name}'
                )
                return transaction
        except Exception as e:
            raise serializers.ValidationError('Failed to create money request')
    
    def _create_successful_transfer(self, sender, recipient, amount, validated_data):
        """Create successful transfer transaction records for both parties."""
        with db_transaction.atomic():
            sender_transaction = Transaction.objects.create(
                **validated_data,
                status=Transaction.TransactionStatus.SUCCESS,
                balance=Account.get_balance(sender.id),
                description=f'Money sent to {recipient.full_name}'
            )
            
            # Create recipient's transaction
            Transaction.objects.create(
                user_id=recipient,
                amount=amount,
                transaction_type=Transaction.TransactionType.RECEIVE,
                recipient_id=sender,
                status=Transaction.TransactionStatus.SUCCESS,
                description=f'Money received from {sender.full_name}',
                balance=Account.get_balance(recipient.id)
            )
            
            # Create notifications
            Notification.objects.create(
                user_id=sender,
                title='Money Sent',
                notification_type='Transfer',
                message=f'Successfully sent ${amount} to {recipient.full_name}'
            )
            
            Notification.objects.create(
                user_id=recipient,
                title='Money Received',
                notification_type='Transfer',
                message=f'Received ${amount} from {sender.full_name}'
            )
            return sender_transaction
        

    def create(self, validated_data):
        """Create a new transaction."""
        user = validated_data['user_id']
        amount = validated_data['amount']
        transaction_type = validated_data['transaction_type']
        recipient = validated_data['recipient_id']
        
        try:
            with db_transaction.atomic():
                primary_method = PaymentMethod.objects.select_for_update().get(
                    user_id=user.id,
                    is_primary=True
                )
                secondary_method = PaymentMethod.objects.select_for_update().filter(
                    user_id=user.id,
                    is_primary=False
                ).first()
        except PaymentMethod.DoesNotExist:
            raise serializers.ValidationError('No valid payment method found')
        
        if transaction_type == Transaction.TransactionType.PURCHASE:
            return self._process_purchase(user, amount, primary_method, secondary_method, validated_data)
        elif transaction_type == Transaction.TransactionType.SEND:
            return self._process_money_transfer(user, recipient, amount, primary_method, validated_data)
        elif transaction_type == Transaction.TransactionType.REQUEST:
            return self._submit_money_request(user, recipient, amount)
        else:
            raise serializers.ValidationError('Invalid transaction type')    
            