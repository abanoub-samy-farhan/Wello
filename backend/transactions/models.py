from decimal import Decimal
from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from authentication.models import User
import uuid

class Transaction(models.Model):
    """Model for handling financial transactions between users.
    """
    
    class TransactionType(models.TextChoices):
        PURCHASE = 'Purchase', 'Purchase'
        SEND = 'Send', 'Send Money'
        RECEIVE = 'Receive', 'Receive Money'
        REQUEST = 'Request', 'Money Request'
    
    class TransactionStatus(models.TextChoices):
        PENDING = 'Pending', 'Pending'
        SUCCESS = 'Success', 'Success'
        FAILED = 'Failed', 'Failed'
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text='Unique identifier for the transaction'
    )
    user_id = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='transactions',
        help_text='User who initiated the transaction'
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
        help_text='Transaction amount (must be positive)'
    )
    transaction_type = models.CharField(
        max_length=10,
        choices=TransactionType.choices,
        help_text='Type of transaction'
    )
    recipient_id = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        null=True, 
        related_name='received_transactions',
        help_text='Recipient user for Send/Receive transactions'
    )
    status = models.CharField(
        max_length=10,
        choices=TransactionStatus.choices,
        default=TransactionStatus.PENDING,
        help_text='Current status of the transaction'
    )
    description = models.TextField(
        null=True,
        help_text='Description or notes about the transaction'
    )
    balance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        help_text='Resulting balance after transaction'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text='Timestamp when transaction was created'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text='Timestamp when transaction was last updated'
    )
    
    def clean(self):
        """Validate transaction data before saving."""
        if self.transaction_type == self.TransactionType.SEND and not self.recipient_id:
            raise ValidationError({'recipient_id': 'Recipient is required for Send transactions'})
        
        if self.amount <= 0:
            raise ValidationError({'amount': 'Transaction amount must be positive'})
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.transaction_type} - {self.amount} - {self.status}"
