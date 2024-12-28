from django.db import models
import uuid
# Create your models here.
class PaymentMethod(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey("authentication.User", on_delete=models.CASCADE)
    provider = models.CharField(max_length=100)
    card_number = models.CharField(max_length=100, null=True, blank=True, unique=True)
    method_type = models.CharField(max_length=100)
    expiry_date = models.CharField(max_length=5, null=True)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.provider.lower() in ['orange', 'vodafone']:
            return "Payment Method: " + self.provider + " - " + self.user_id.phone_number
        elif self.provider.lower() == 'paypal':
            return "Payment Method: " + self.provider + " - " + self.user_id.email
        return "Payment Method: xxxx-xxxx-xxxx-" + self.card_number[-4:] + " - " + self.provider

    @staticmethod
    def delete_payment_method(user_id, payment_method_id):
        try:
            payment_method = PaymentMethod.objects.get(user_id=user_id, id=payment_method_id)
            if payment_method.is_primary:
                user_secondary_payment_methods = PaymentMethod.objects.filter(user_id=user_id, is_primary=False)
                if len(user_secondary_payment_methods) == 0:
                    raise Exception("Cannot delete primary payment method")
                user_secondary_payment_methods[0].is_primary = True
            payment_method.delete()
            return True
        except Exception as e:
            return False
            
        