from rest_framework import serializers
from .models import PaymentMethod, Accounts
from notifications.models import Notification
import datetime

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'
        extra_kwargs = {
            'card_number': {'required': False},
            'paymnent_method_id': {'required': False},
            'user_id': {'required': False},
            'is_primary': {'required': False},
            'expiry_date': {'required': False},
            'provider': {'required': False},
            'method_type': {'required': False}
        }

    def create(self, validated_data):
        user = validated_data.get('user_id')
        provider = validated_data.pop('provider')
        
        # Validate the provider supported
        print("I am here")
        if provider.lower() not in ['visa', 'mastercard', 'paypal', 'orange', 'vodafone']:
            raise serializers.ValidationError("Provider not supported")
        
        # Validate that the user has no methods with the same provider
        payment_methods = PaymentMethod.objects.filter(user_id=user.id, provider=provider)
        if len(payment_methods) > 0:
            raise serializers.ValidationError("User already has a payment method with this provider")
        

        # Validate the card number is found if the provider is visa or mastercard
        print("I am here")
        if provider.lower() in ['visa', 'mastercard']:
            card_number = validated_data.get('card_number')
            if not card_number:
                raise serializers.ValidationError("Card number is required")
            
            if validated_data.get('method_type').lower() not in ['credit', 'debit']:
                raise serializers.ValidationError("Method type is invalid")
            if len(card_number) != 16:
                raise serializers.ValidationError("Card number is invalid")
            
            print("I am here")
            # Validate expiry date in formate MM/YY string
            expiry_date = validated_data.get('expiry_date')
            if not expiry_date:
                print("I am here")
                raise serializers.ValidationError("Expiry date is required")
            expiry_date = expiry_date.split('-')[-2:]

            print(expiry_date)
            current_date = datetime.datetime.now().strftime("%m/%y").split('/')
            current_date[1] = current_date[1][-2:]
            if len(expiry_date) != 2:
                raise serializers.ValidationError("Expiry date is invalid")
            elif len(expiry_date[0]) != 2 or len(expiry_date[1]) != 2:
                raise serializers.ValidationError("Expiry date is invalid")
            
        if provider.lower() in ['orange', 'vodafone']:
            phone_number = user.phone_number
            if not phone_number:
                raise serializers.ValidationError("Phone number is required")
            
            if phone_number[0:3] != '012' and provider.lower() == 'orange':
                raise serializers.ValidationError("Phone number is invalid for this provider")
            elif phone_number[0:3] != '010' and provider.lower() == 'vodafone':
                raise serializers.ValidationError("Phone number is invalid for this provider")
            
            if len(phone_number) != 11:
                raise serializers.ValidationError("Phone number is invalid")
            
        if provider.lower() == 'paypal':
            email = user.email
            if not email:
                raise serializers.ValidationError("Email is required")
            if validated_data.get('method_type').lower() != 'online wallet':
                raise serializers.ValidationError("Method type is invalid")
            
        
        validated_data['provider'] = provider.lower()
        # Validate that the user has no primary payment method
        payment_methods = PaymentMethod.objects.filter(user_id=user.id, is_primary=True)
        if len(payment_methods) == 0:
            validated_data['is_primary'] = True
        payment_methods = PaymentMethod.objects.filter(user_id=user.id)
        if len(payment_methods) == 2:
            raise serializers.ValidationError("Cannot add more than 2 payment methods")
        
        payment_method = PaymentMethod.objects.create(**validated_data)
        return payment_method
    
    def update(self, instance, validated_data):
        if validated_data.get('is_primary'):
            user = validated_data.get('user_id')
            payment_methods = PaymentMethod.objects.filter(user_id=user.id)
            if len(payment_methods) == 1:
                raise serializers.ValidationError("Cannot remove the only payment method")
            user.switch_primary_payment_method()
            return instance
        instance.provider = validated_data.get('provider', instance.provider)
        instance.method_type = validated_data.get('method_type', instance.method_type)
        instance.expiry_date = validated_data.get('expiry_date', instance.expiry_date)
        instance.is_primary = validated_data.get('is_primary', instance.is_primary)
        instance.save()
        return instance
    

class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = '__all__'
        extra_kwargs = {
            'payment_method_id': {'required': False},
            'user_id': {'required': False},
            'balance': {'required': False}
        }