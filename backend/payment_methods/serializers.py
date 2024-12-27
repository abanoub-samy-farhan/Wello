from rest_framework import serializers
from .models import PaymentMethod
from user_management.models import User

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'
        extra_kwargs = {
            'card_number': {'write_only': True},
        }

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        user = User.objects.get(id=user_id)
        provider = validated_data.get('provider')
        
        # Validate provider and method type
        if provider in ['Vodafone', 'Orange', 'Fawry']:
            if validated_data.get('method_type') not in ['Mobile']:
                raise serializers.ValidationError("Invalid method type for provider")
            if not user.phone_number:
                raise serializers.ValidationError("User has no phone number")
            if provider == 'Vodafone' and not user.phone_number.startswith('010'):
                raise serializers.ValidationError("Vodafone number must start with 010")
            if provider == 'Orange' and not user.phone_number.startswith('012'):
                raise serializers.ValidationError("Orange number must start with 012")
            
        elif provider in ['Visa', 'Mastercard', 'Paypal']:
            if validated_data.get('method_type') not in ['Credit', 'Debit', 'Online Wallet']:
                raise serializers.ValidationError("Invalid method type for provider")
        
        # Validate that the user has no primary payment method
        payment_methods = PaymentMethod.objects.filter(user_id=user_id)
        if len(payment_methods) == 0:
            validated_data['is_primary'] = True
        
        # Validate expiry date
        expiry_date = validated_data.get('expiry_date')
        if expiry_date < user.created_at.date():
            raise serializers.ValidationError("Expiry date cannot be before user creation date")
        payment_method = PaymentMethod.objects.create(user_id=user, **validated_data)
        return payment_method
    
    def update(self, instance, validated_data):
        if validated_data.get('is_primary'):
            user_id = validated_data.get('user_id', instance.user_id)
            user = User.objects.get(id=user_id)
            payment_methods = PaymentMethod.objects.filter(user_id=user_id)
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