import smtplib
from email.mime.text import MIMEText
import pyotp

class Router():
    """Class for handling routing trafic of different types of messeges """
    server = None
    def __init__(self, host, port, username, password):
        self.host = host
        self.port = port
        self.username = username
        self.password = password


class EmailRouter(Router):
    """Class for handling sending emails for """
    def __init__(self, host, port, username, password):
        super().__init__(host, port, username)
        self.server = smtplib.SMTP(host, port)
        self.server.starttls()
        self.server.login(username, password)
    
    def send_otp_for_verification(self, email):
        otp = pyotp.TOTP(pyotp.random_base32())
        msg = MIMEText(f'Thanks for signing up! Your OTP is {otp.now()}')
        msg['Subject'] = 'OTP Verification'
        msg['From'] = self.username
        msg['To'] = email
        self.server.sendmail(self.username, email, msg.as_string())
        return otp
    
    def send_verfication_confirmation_msg(self, email):
        msg = MIMEText('Your email has been verified!, you can now login througth the app')
        msg['Subject'] = 'Email Verification'
        msg['From'] = self.username
        msg['To'] = email
        self.server.sendmail(self.username, email, msg.as_string())
        return True
    
    def send_password_reset_link(self, email):
        reset_token = pyotp.random_base32()
        msg = MIMEText('Click on the link to reset your password http://localhost:8000/reset-password/?email=' + email + '&token=' + reset_token)
        msg['Subject'] = 'Password Reset'
        msg['From'] = self.username
        msg['To'] = email
        self.server.sendmail(self.username, email, msg.as_string())
        return reset_token
    def send_report_notification(self, email):
        msg = MIMEText('You have been reported, please check the app for more details')
        msg['Subject'] = '[Action Needed] Report Notification'
        msg['From'] = self.username
        msg['To'] = email
        self.server.sendmail(self.username, email, msg.as_string())
        return True

    def __del__(self):
        self.server.quit()

# Future improvements:
# 1. Add more methods for sending different types of emails
# 2. Add logging for email sending
# 3. Add more error handling
# 4. Add SMS sending capabilities