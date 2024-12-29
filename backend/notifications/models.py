from django.db import models
from authentication.models import User
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
    title = models.CharField(max_length=2
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
    
    @staticmethod
    def money_sent_recieve_notification(sender, reciever, amount):
        sender_message = f"You have sent ${amount} to {reciever.full_name} successfully"
        reciever_message = f"You have received ${amount} from {sender.full_name} successfully, it has been deposited to your primary account"
        reciever_notification = Notification.objects.create(
            user_id=reciever,
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
    
    @staticmethod
    def money_request_notification(reciever: User, sender, amount):
        receiver_message = f"{sender.full_name} has requested ${amount} from you, this amount will be deducted from your primary account"
        reciever_notification = Notification.objects.create(
            user_id=reciever,
            title="Money Request",
            notification_type="Money Request",
            message=receiver_message,
        )
        reciever_notification.save()
        return True
    
    @staticmethod
    def declined_request_notification(reciever, sender_full_name):
        Notification.objects.create(
            user_id=reciever,
            title="Request Declined",
            notification_type="Money Request",
            message=f"Your request has been declined by {sender_full_name}",
        )

        return True
    
    @staticmethod
    def send_money_nosufficient_funds(sender, reciever):
        decline_notification = Notification.objects.create(
            user_id=sender,
            title="Insufficient Funds",
            notification_type="Money Request",
            message=f"Your request to send money to {reciever.full_name} has been declined due to insufficient funds",
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
    

