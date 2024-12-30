from rest_framework import serializers
from .models import Transaction
from notifications.models import Notification
from payment_methods.models import PaymentMethod, Accounts

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        extra_kwargs = {
            'status': {'read_only': True, 'required': False},
            'created_at': {'read_only': True, 'required': False},
            'updated_at': {'read_only': True, 'required': False},
            'balance': {'read_only': True, 'required': False},
            'description': {'read_only': True, 'required': False},
            'recipient_id': {'required': False},
            'user_id': {'required': False}
        }

    def create(self, validated_data):
        transaction_type = validated_data.get('transaction_type')
        user = validated_data.get('user_id')
        try:
            primary_payment_method = PaymentMethod.objects.get(user_id=user.id, is_primary=True)
        except PaymentMethod.DoesNotExist:
            primary_payment_method = None
        
        print(primary_payment_method)
        try:
            secondary_payment_method = PaymentMethod.objects.get(user_id=user.id, is_primary=False)
        except PaymentMethod.DoesNotExist:
            secondary_payment_method = None

        if not primary_payment_method:
            raise serializers.ValidationError('Primary payment method not found')
        if transaction_type == 'Purchase':
            amount = validated_data.get('amount')
            primary_payment_method_balance = Accounts.\
                get_primary_account_balance(primary_payment_method.id)
            if primary_payment_method_balance < amount:
                if Accounts.get_balance(user.id) < amount:
                    raise serializers.ValidationError('Insufficient balance in both accounts')
                else:
                    confirm_transaction_1 = Accounts.withdraw_from_account(primary_payment_method.id, primary_payment_method_balance)
                    confirm_transaction_2 = Accounts.withdraw_from_account(secondary_payment_method.id, amount - primary_payment_method_balance)
                    if confirm_transaction_1 and confirm_transaction_2:
                        validated_data['status'] = 'Success'
                        validated_data['balance'] = Accounts.get_balance(user.id)
                        validated_data['description'] = 'Purchase made'
                        transaction = Transaction.objects.create(**validated_data)

                        Notification.objects.create(
                            user_id=user,
                            title="Purchase Proceeded Successfully",
                            notification_type="Purchase",
                            message=f"You have made a purchase of ${amount} successfully from {validated_data['company']}",
                        )
                        return transaction
                    else:
                        raise serializers.ValidationError('Transaction failed')
            else:
                confirm_transaction = Accounts.withdraw_from_account(primary_payment_method.id, amount)
                if confirm_transaction:
                    validated_data['status'] = 'Success'
                    validated_data['balance'] = Accounts.get_balance(user.id)
                    validated_data['description'] = 'Purchase made'
                    transaction = Transaction.objects.create(**validated_data)
                    Notification.objects.create(
                            user_id=user,
                            title="Purchase Proceeded Successfully",
                            notification_type="Purchase",
                            message=f"You have made a purchase of ${amount} successfully from primary account",
                        )
                    return transaction
                else:
                    raise serializers.ValidationError('Transaction failed')
        elif transaction_type == 'Send':
            recipient = validated_data.get('recipient_id')
            if not recipient:
                raise serializers.ValidationError('Recipient not found')
            amount = validated_data.get('amount')
            primary_payment_method_balance = Accounts.get_primary_account_balance(primary_payment_method.id)
            if primary_payment_method_balance < amount:
                raise serializers.ValidationError('Insufficient balance for making transfer')
            else:
                recipient_primary_payment_method = PaymentMethod.objects.get(user_id=recipient.id, is_primary=True)
                confirm_transaction_1 = Accounts.withdraw_from_account(primary_payment_method.id, amount)
                confirm_transaction_2 = Accounts.top_up_account(recipient_primary_payment_method.id, amount)
                if confirm_transaction_1 and confirm_transaction_2:
                    validated_data['status'] = 'Success'
                    validated_data['description'] = 'Money sent to ' + recipient.full_name
                    validated_data['balance'] = Accounts.get_balance(user.id)
                    transaction_sender = Transaction.objects.create(**validated_data)
                    transaction_recipient = Transaction.objects.create(user_id=recipient, amount=amount, transaction_type='Recieve', \
                                                                       recipient_id=user, status='Success',\
                                                                          description='Money received from ' + user.full_name, \
                                                                            balance=Accounts.get_balance(recipient.id))
                    
                    # Making Notification for sender and reciever
                    Notification.money_sent_recieve_notification(user, recipient, amount)
                    return transaction_sender
                else:
                    raise serializers.ValidationError('Transaction failed')
        elif transaction_type == 'Request':
            recipient = validated_data.get('recipient_id')
            amount = validated_data.get('amount')
            recipient_primary_payment_method = PaymentMethod.objects.get(user_id=recipient.id, is_primary=True)
            if not recipient_primary_payment_method:
                raise serializers.ValidationError('Recipient primary payment method not found')
            transaction_recipient = Transaction.objects.create(user_id=recipient, amount=amount, transaction_type='Request', \
                                                               recipient_id=user, status='Pending',\
                                                                  description='Money requested by ' + user.full_name, \
                                                                    balance=Accounts.get_balance(recipient.id))
            
            # Making Notification for reciever of the request

            Notification.money_request_notification(recipient, user, amount)
            return transaction_recipient
        

                
            