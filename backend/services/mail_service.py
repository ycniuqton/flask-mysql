from threading import Thread

from app import app
from app import mail
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

#
# def send_async_email(app, msg):
#     with app.app_context():
#         try:
#             mail.send(msg)
#         except ConnectionRefusedError:
#             raise InternalServerError("[MAIL SERVER] not working")


def send_async_email(subject, sender, recipients, text_body, html_body):
    msg = MIMEMultipart('alternative')
    msg.set_charset('utf8')
    msg['Subject'] = subject
    msg['From'] = app.config['MAIL_USERNAME']
    msg['To'] = recipients[0]
    _attach = MIMEText(html_body.encode('utf-8'), 'html', 'UTF-8')
    msg.attach(_attach)

    # Send the message via local SMTP server.
    s = smtplib.SMTP("smtp.gmail.com")
    s.starttls()
    s.login(app.config['MAIL_USERNAME'],
            app.config['MAIL_PASSWORD'])
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode("utf8"))
    s.quit()



def send_email(subject, sender, recipients, text_body, html_body):
    Thread(target=send_async_email, args=(subject, sender, recipients, text_body, html_body)).start()