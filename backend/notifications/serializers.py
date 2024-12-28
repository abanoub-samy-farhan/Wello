from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        extra_kwargs = {
            'user_id': {'read_only': True},
            'title': {'read_only': True},
            'notification_type': {'read_only': True},
            'message': {'read_only': True},
        }