from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            }
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
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
            setattr(instance, key, value)
        instance.save()
        return instance