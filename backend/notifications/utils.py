import smtplib
from email.mime.text import MIMEText
from authentication.models import Verification_Token
from email.mime.multipart import MIMEMultipart
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
        super().__init__(host, port, username, password)
        self.server = smtplib.SMTP(host, port)
        self.server.starttls()
        self.server.login(username, password)
    
    def send_verification_link(self, recipient_email):
        """
        Generates an OTP and sends it to the specified email address.
        
        :param recipient_email: The email address to send the OTP to.
        :return: The OTP object and the secret key for verification.
        """
        # Generate a random base32 secret and create a TOTP object
        secret = pyotp.random_base32()
        otp = pyotp.TOTP(secret)
        current_otp = otp.now()

        link = f'http://localhost:3000/auth/verify/?email={recipient_email}&otp={current_otp}'

        # Create the email message
        message = MIMEMultipart('alternative')
        message['Subject'] = 'OTP Verification'
        message['From'] = self.username
        message['To'] = recipient_email

        # Create plain-text and HTML versions of the message
        text = f'Thanks for signing up to Wello App! Your Verfication link is {link}, make sure to never share it with anyone.'
        html = f"""
        <html>
            <body>
                <p>Thanks for signing up to Wello App!<br>
                Your Verfication link is <b>{link}</b>.<br>
                make sure to never shar it with anyone</p>
            </body>
        </html>
        """

        # Attach parts into message container
        part1 = MIMEText(text, 'plain')
        part2 = MIMEText(html, 'html')

        message.attach(part1)
        message.attach(part2)

        # Send the email via SMTP server
        try:
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.ehlo()  # Identify yourself to the SMTP server
                server.starttls()  # Secure the connection
                server.ehlo()  # Re-identify after securing the connection

                server.login(self.username, self.password)

                # Send the email
                server.sendmail(self.username, recipient_email, message.as_string())

                Verification_Token.objects.create(email=recipient_email, token=current_otp)
                print('OTP email sent successfully!')
        except smtplib.SMTPAuthenticationError as e:
            print('Authentication failed. Check your App Password and email address.')
            print(f'Error details: {e}')
            return None, None
        except smtplib.SMTPRecipientsRefused:
            print('The recipient address was refused by the server.')
            return None, None
        except smtplib.SMTPException as e:
            print('An SMTP error occurred.')
            print(f'Error details: {e}')
            return None, None
        except Exception as e:
            print('An unexpected error occurred.')
            print(f'Error details: {e}')
            return None, None

        # Return the OTP object and secret for verification (store the secret securely)
        return otp, secret

    
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

# Future improvements:
# 1. Add more methods for sending different types of emails
# 2. Add logging for email sending
# 3. Add more error handling
# 4. Add SMS sending capabilities