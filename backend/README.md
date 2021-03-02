# Order Shipping 's backend
This is backend, nothing much to talk about this. 

## Architecture
This is project 's  folder tree
- run.py: run flask app 
- app.py: define the flask app 
- database
    - db.py: init database
    - models.py: define models
- resources
    - auth.py: handle login, signup method
    - contact.py: handle request from contact page
    - errors.py: define common error messages
    - order.py: handle creating order request
    - reset_password.py: handle forgot password and reset password phase
    - routes.py: define all routes in this app
    - users.py: api handler for USER, handle get user 's info request. 
- services
    - mail_service.py: connect to Gmail API and send mail.

## Deploy 
Install required packet
```
cd ./backend
pip install -r requirements.txt
```
Update your domain in `.env` file. Open `.env` file and edit the `your_domain_here` 
<pre>
JWT_SECRET_KEY = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'
MAIL_SERVER: "smtp.gmail.com"
MAIL_PORT = "465"
MAIL_USERNAME = "no-reply@zulemaz.com"
MAIL_PASSWORD = ""
DOMAIN = "https://"<em>your_domain_here</em>  
ADMIN_EMAIL = 'support@zulemaz.com'
</pre>


Replace `pem.crt` and `pem.key` with your ssl keypair

Install required packet
```
cd ./backend
pip run.py
```
Accutally, if you forgot, i remind you that. 
You need to setup `Gmail API` first to using sending email feature.
After setup `Gmail API`, you will get a service-key.json. Replace it with mine here. 