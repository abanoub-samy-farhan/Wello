from django.db import models
from payment_methods.models import PaymentMethod
import uuid

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=11, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified = models.BooleanField(default=False)
    is_suspended = models.BooleanField(default=False)
    is_first_login = models.BooleanField(default=True)

    def __str__(self):
        return self.username
    
    def switch_primary_payment_method(self):
        try:
            user_primary_payment_method = PaymentMethod.objects.get(user_id=self.id, is_primary=True)
            user_secondary_payment_method = PaymentMethod.objects.get(user_id=self.id, is_primary=False)
            if not user_secondary_payment_method:
                raise Exception("User has only one payment method")
            user_primary_payment_method.is_primary = False
            user_primary_payment_method.save()
            user_secondary_payment_method.is_primary = True
            user_secondary_payment_method.save()
            return True
        except Exception as e:
            return False
    
    
