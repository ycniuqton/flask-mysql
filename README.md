# Order Shipping Service
There is nothing to talk about this. 

## Environment 

- Ubuntu 18.04
- Nginx 
- Mongodb
- Python==3.6.9

## System architecture
- Frontend: js, html, css 
- Backend: flask - restapi 
- Mail service: Gmail API 


## Frontend

### Nginx  

Install nginx

```
apt install nginx
```

Copy `frontend` folder to `/var/www/html/`

```
cp -R frontend  /var/www/html/
```
Config nginx, override `/etc/nginx/site-enable/default` by this config. Replace `ssl_certificate` section with yours.
```
server {
    listen 80;
    return 301 https://$host$request_uri;
}

server {
        server_name zulemaz.com;
        listen 443 ssl; # managed by Certbot
        
        ### ssl_sertificate 
        ssl_certificate /etc/letsencrypt/live/zulemaz.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/zulemaz.com/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

        ssl_protocols TLSv1.2 TLSv1.1 TLSv1;
        root /var/www/html/frontend;
        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                try_files $uri $uri/ =404;
        }
}

```
Restart nginx

```
service nginx restart
```


## Backend

### Mongodb 

Install 
```
apt update
apt install -y mongodb
```


### Python  

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

Start service
```
cd ./backend
pip run.py
```
