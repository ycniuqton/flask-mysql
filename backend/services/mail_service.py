from __future__ import print_function
from threading import Thread

from app import app
from app import mail

from googleapiclient.discovery import build
from apiclient import errors
from httplib2 import Http
from email.mime.text import MIMEText
import base64
from google.oauth2 import service_account



def create_message(sender, to, subject, message_text):
    """Create a message for an email.
    Args:
        sender: Email address of the sender.
        to: Email address of the receiver.
        subject: The subject of the email message.
        message_text: The text of the email message.
    Returns:
        An object containing a base64url encoded email object.
    """
    message = MIMEText(message_text,'html')
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    # print(message.as_string())
    return {'raw': base64.urlsafe_b64encode(message.as_string().encode()).decode()}

def send_message(service, user_id, message):
    """Send an email message.
    Args:
        service: Authorized Gmail API service instance.
        user_id: User's email address. The special value "me"
        can be used to indicate the authenticated user.
        message: Message to be sent.
    Returns:
        Sent Message.
    """
    try:
        message = (service.users().messages().send(userId=user_id, body=message)
                             .execute())
        print('Message Id: %s' % message['id'])
        return message
    except errors.HttpError as error:
        print('An error occurred: %s' % error)

def service_account_login(EMAIL_FROM):
    SCOPES = ['https://www.googleapis.com/auth/gmail.send']
    SERVICE_ACCOUNT_FILE = 'service-key.json'

    credentials = service_account.Credentials.from_service_account_file(
                    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    delegated_credentials = credentials.with_subject(EMAIL_FROM)
    service = build('gmail', 'v1', credentials=delegated_credentials)
    return service



def send_async_email(subject, sender, recipients, text_body, html_body):
    EMAIL_FROM = app.config['MAIL_USERNAME']
    service = service_account_login(EMAIL_FROM)
    # Call the Gmail API
    message = create_message(EMAIL_FROM, recipients[0], subject, html_body)
    sent = send_message(service,'me', message)



def send_email(subject, sender, recipients, text_body, html_body):
    Thread(target=send_async_email, args=(subject, sender, recipients, text_body, html_body)).start()