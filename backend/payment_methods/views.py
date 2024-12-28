from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PaymentMethod
from authentication.models import User
from .serializers import PaymentMethodSerializer

class PaymentGetAll(APIView):
    def get(self, request):
        payment_methods = PaymentMethod.objects.all()
        serializer = PaymentMethodSerializer(payment_methods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PaymentGetByUserId(APIView):
    def get(self, request):
        user_id = request.user_id
        payment_methods = PaymentMethod.objects.filter(user_id=user_id)
        serializer = PaymentMethodSerializer(payment_methods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PaymentGetById(APIView):
    def get(self, request):
        payment_method_id = request.data.get('payment_method_id')
        payment_method = PaymentMethod.objects.get(id=payment_method_id)
        serializer = PaymentMethodSerializer(payment_method)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PaymentUpdate(APIView):
    def put(self, request):
        payment_method_id = request.data.get('payment_method_id')
        request.data['user_id'] = request.user_id
        payment_method = PaymentMethod.objects.get(id=payment_method_id)
        serializer = PaymentMethodSerializer(payment_method, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PaymentCreate(APIView):
    def post(self, request):
        user_id = request.user_id
        request.data['user_id'] = user_id
        serializer = PaymentMethodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PaymentSwitchPrimaryMethod(APIView):
    def post(self, request):
        user_id = request.user_id
        print(user_id)
        user = User.objects.get(id=user_id)
        success = user.switch_primary_payment_method()
        if not success:
            return Response({"message": "Error happened while switching"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)
    
class PaymentDelete(APIView):
    def delete(self, request):
        try:
            payment_method_id = request.data.get('payment_method_id')
            user_id = request.user_id
            success = PaymentMethod.delete_payment_method(user_id, payment_method_id)
            if not success:
                return Response({"message": "Error happened while deleting, maybe you are deleting a primary method"}, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

