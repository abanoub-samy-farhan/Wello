from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from .serializers import NotificationSerializer
# Create your views here.

class NotificaitonByUserID(APIView):
    def get(self, request):
        user_id = request.data.get('user_id')
        notifications = Notification.objects.filter(user_id=user_id).order_by('created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
