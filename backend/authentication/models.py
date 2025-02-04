from django.db import models
from django.contrib.auth.models import AbstractBaseUser as AB
import uuid
from asgiref.sync import sync_to_async
from payment_methods.models import PaymentMethod

class User(AB):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=11, unique=True)
    address = models.CharField(max_length=255, default=None, null=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified = models.BooleanField(default=False)
    is_suspended = models.BooleanField(default=False)
    is_first_login = models.BooleanField(default=True)

    def __str__(self):
        return self.full_name
    
    def switch_primary_payment_method(self):
        try:
            paymentmethods = PaymentMethod.objects.filter(user_id=self.id)
            if paymentmethods.count() == 1:
                raise Exception("User has only one payment method")
            
            for paymentmethod in paymentmethods:
                if paymentmethod.is_primary:
                    paymentmethod.is_primary = False
                else:
                    paymentmethod.is_primary = True
                paymentmethod.save()
            return True
        except Exception as e:
            return False
    

class UserSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    jwt_token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expriy_at = models.DateTimeField()
    is_active = models.BooleanField(default=True)

class Verification_Token(models.Model):
    email = models.EmailField(max_length=100, default=None)
    token = models.CharField(max_length=255)
