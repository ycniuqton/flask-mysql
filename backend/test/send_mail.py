import smtplib

gmail_user = 'support@zulemaz.com'
gmail_password = "!123456a@A"





# smtpserver = smtplib.SMTP("smtp.gmail.com", 465)
# smtpserver.ehlo()
# smtpserver.starttls()
# smtpserver.ehlo()
# smtpserver.login('vienbui39dj3e33@gmail.com', "Abcd@1234")
#


gmail_user = 'vienbui39dj3e33@gmail.com'
gmail_password = "Abcd@1234"


sent_from = gmail_user
to = ['ngohongqui@gmail.com']
subject = 'OMG Super Important Message'
body = 'Hey, what'

email_text = """\
From: %s
To: %s
Subject: %s

%s
""" % (sent_from, ", ".join(to), subject, body)

try:
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(gmail_user, gmail_password)
    server.sendmail(sent_from, to, email_text)
    server.close()

    print ('Email sent!')
except Exception as e :
    raise  e
    print ('Something went wrong...')