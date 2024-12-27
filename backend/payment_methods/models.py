from django.db import models
from user_management.models import User
import uuid
# Create your models here.
class PaymentMethod(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.Choices('Vodafone', 'Orange', 'Paypal', 'Visa', 'Mastercard', 'Fawry')
    card_number = models.CharField(max_length=100, unique=True)
    method_type = models.Choices('Credit', 'Debit', 'Mobile', 'Fawry', 'Online Wallet')
    expiry_date = models.DateField(auto_now=False, auto_now_add=False)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Payment Method: xxxx-xxxx-xxxx-" + self.card_number[-4:] + " - " + self.provider

    @staticmethod
    def delete_payment_method(self, user_id, payment_method_id):
        try:
            payment_method = PaymentMethod.objects.get(user_id=user_id, id=payment_method_id)
            if payment_method.is_primary:
                raise Exception("Cannot delete primary payment method")
            payment_method.delete()
            return True
        except Exception as e:
            return False
            
        