from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'is_verified': {'required': False},
            'is_active': {'required': False},
            'address': {'required': False},
            'phone_number': {'required': False},
            }
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)

        # Validating that the email is unique
        if User.objects.filter(email=user.email).exists():
            raise serializers.ValidationError("Email already exists")
        
        # Validating that the phone number is unique
        if User.objects.filter(phone_number=user.phone_number).exists():
            raise serializers.ValidationError("Phone number already exists")
        
        if password is not None:
            user.set_password(password)
        user.save()
        return user
        
    def update(self, instance, validated_data):
        """Updating the user instance"""
        if 'password' in validated_data:
            plain_password = validated_data.pop('password')
            instance.set_password(plain_password)
        for key, value in validated_data.items():
            print(key, value)
            setattr(instance, key, value)
        instance.save()
        return instance