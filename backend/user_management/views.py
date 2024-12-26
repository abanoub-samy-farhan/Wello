from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

class UserGetAll(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UserCreate(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserCRUD(APIView):
    def get(self, request):
        user_id = request.user_id
        if not user_id:
            return Response(status=status.HTTP_403_FORBIDDEN)
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        user_id = request.user_id
        if not user_id:
            return Response(status=status.HTTP_403_FORBIDDEN)

        user = User.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        user_id = request.user_id
        if not user_id:
            return Response(status=status.HTTP_403_FORBIDDEN)
        user = User.objects.get(id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)