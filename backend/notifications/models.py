from django.db import models
from user_management.models import User
from payment_methods.models import PaymentMethod
import uuid

# Create your models here

"""
Notificaiton types:
1. Money sent/received --- done
2. money request/approval 
3. report
4. Making a pruchase
5. confirming a purchase
"""

class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    notification_type = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + " - " + self.notification_type
    
    @staticmethod
    def mark_as_read(self, user_id, notification_id):
        try:
            notification = Notification.objects.get(user_id=user_id, id=notification_id)
            notification.is_read = True
            notification.save()
            return True
        except Exception as e:
            return False
    
    def money_sent_recieve_notification(self, receiver_id, amount):
        sender = User.objects.get(id=self.user_id)
        receiver = User.objects.get(id=receiver_id)
        sender_message = f"You have sent ${amount} to {receiver.full_name} successfully"
        receiver_primary_account = PaymentMethod.objects.get(user_id=receiver_id, is_primary=True)
        account = None
        if receiver_primary_account.provider == "Paypal":
            account = "Paypal"
        elif receiver_primary_account.provider in ['Visa', 'Mastercard']:
            account = "Bank Account"
        else:
            account = "Wallet"
        reciever_message = f"You have received ${amount} from {sender.full_name} successfully, it has been deposited to your {account} account"
        reciever_notification = Notification.objects.create(
            user_id=receiver,
            title="Money Received",
            notification_type="Money Sent/Received",
            message=reciever_message,
        )
        sender_notification = Notification.objects.create(
            user_id=sender,
            title="Money Sent",
            notification_type="Money Sent/Received",
            message=sender_message,
        )
        reciever_notification.save()
        sender_notification.save()
        return True
    
    def money_request_notification(self, receiver_id, amount):
        sender = User.objects.get(id=self.user_id)
        receiver = User.objects.get(id=receiver_id)
        sender_message = f"You have requested ${amount} from {receiver.full_name}"
        receiver_message = f"{sender.full_name} has requested ${amount} from you, this amount will be 
        deducted from your primary account"
        reciever_notification = Notification.objects.create(
            user_id=receiver,
            title="Money Request",
            notification_type="Money Request",
            message=receiver_message,
        )
        sender_notification = Notification.objects.create(
            user_id=sender,
            title="Money Request",
            notification_type="Money Request",
            message=sender_message,
        )
        reciever_notification.save()
        sender_notification.save()
        return True
    
    def declined_request_notification(self, reciever_id):
        receiver = User.objects.get(id=reciever_id).full_name
        decline_notification = Notification.objects.create(
            user_id=self.user_id,
            title="Request Declined",
            notification_type="Money Request",
            message=f"Your request has been declined by {receiver}",
        )
        return True
    
    def money_transfere_nosufficient_funds(self, receiver_id):
        receiver = User.objects.get(id=receiver_id).full_name
        decline_notification = Notification.objects.create(
            user_id=self.user_id,
            title="Insufficient Funds",
            notification_type="Money Request",
            message=f"Your request to transfer money to {receiver} has been declined due to insufficient funds",
        )
        decline_notification.save()
        return True
    
    def send_money_nosufficient_funds(self, receiver_id):
        sender = User.objects.get(id=self.user_id).full_name
        reciever = User.objects.get(id=receiver_id).full_name
        decline_notification = Notification.objects.create(
            user_id=self.user_id,
            title="Insufficient Funds",
            notification_type="Money Request",
            message=f"Your request to send money to {reciever} has been declined due to insufficient funds",
        )
        decline_notification.save()
        return True
    
    def report_notification(self, reported_user_id, reason):
        reported_user = User.objects.get(id=reported_user_id)
        report_notification = Notification.objects.create(
            user_id=reported_user,
            title="Reported",
            notification_type="Report",
            message=f"You have been reported for {reason}",
        )
        report_notification.save()
        return True
    
    # To be implemented
    def purchase_placement_notification(self, purchase_id, amount):
        pass

    def purchase_confirmation_notification(self, purchase_id, amount):
        pass

    def purchase_declined_notification(self, purchase_id, amount):
        pass

        
        
    
class Feedback_Reports(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    reported_user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reported_user_id')
    reason = models.TextField()
    status = models.Choices('Pending', 'Resolved')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + " - " + self.status
    

