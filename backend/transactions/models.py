from django.db import models
from authentication.models import User
import uuid

class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='transactions'
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=255)
    recipient_id = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        null=True, 
        related_name='received_transactions'
    )
    status = models.CharField(max_length=255)
    description = models.TextField(null=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.description
