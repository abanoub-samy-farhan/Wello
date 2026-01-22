from django.db import models, transaction
import uuid
# Create your models here.
class PaymentMethod(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey("authentication.User", on_delete=models.CASCADE)
    provider = models.CharField(max_length=100)
    card_number = models.CharField(max_length=100, null=True, blank=True, unique=True)
    method_type = models.CharField(max_length=100)
    expiry_date = models.CharField(max_length=5, null=True, blank=True)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.provider.lower() in ['orange', 'vodafone']:
            return "Payment Method: " + self.provider + " - " + self.user_id.phone_number
        elif self.provider.lower() == 'paypal':
            return "Payment Method: " + self.provider + " - " + self.user_id.email
        return "Payment Method: xxxx-xxxx-xxxx-" + self.card_number[-4:] + " - " + self.provider
            

class Account(models.Model):
    payment_method_id = models.OneToOneField(PaymentMethod, on_delete=models.CASCADE)
    user_id = models.ForeignKey("authentication.User", on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return "Account: " + self.user_id.phone_number

    @staticmethod
    def get_balance(user_id):
        # Get all accounts for the user
        accounts = Account.objects.filter(user_id=user_id)
        total_balance = 0
        for account in accounts:
            print(account.balance)
            total_balance += account.balance
        return total_balance

    @staticmethod
    def get_primary_account_balance(payment_method_id):
        try:
            account = Account.objects.get(payment_method_id=payment_method_id)
            return account.balance
        except Exception as e:
            return 0
    
    @staticmethod
    def top_up_account(payment_method_id, amount):
        try:
            with transaction.atomic():
                account = Account.objects.get(payment_method_id=payment_method_id)
                account.balance += amount
                account.save()
            return True
        except Exception as e:
            return False
    
    @staticmethod
    def withdraw_from_account(payment_method_id, amount):
        try:
            with transaction.atomic():
                account = Account.objects.get(payment_method_id=payment_method_id)
                if account.balance < amount:
                    return False
                account.balance -= amount
                account.save()
            return True
        except Exception as e:
            return False
    
