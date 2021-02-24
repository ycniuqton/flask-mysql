import smtplib
email_address = ''     # add email address here
Subject = 'Subject: So long...\n\n'
content = ' Dear Test, \n This is a test message.\n\n '
footer = '- Test'    # add test footer
passcode = ''        # add passcode here
conn = smtplib.SMTP_SSL('smtp.mail.yahoo.com', 465)
conn.ehlo()
conn.login(email_address, passcode)
conn.sendmail(email_address,
              email_address,
              Subject + content + footer)
conn.quit()