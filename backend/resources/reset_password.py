from flask import request, render_template
from flask_jwt_extended import create_access_token, decode_token
from database.models import User
from flask_restful import Resource
from flask import current_app
import datetime
from resources.errors import SchemaValidationError, InternalServerError, \
    EmailDoesnotExistsError, BadTokenError
from jwt.exceptions import ExpiredSignatureError, DecodeError, \
    InvalidTokenError
from services.mail_service import send_email
from flask_jwt_extended import jwt_required, get_jwt_identity

class ForgotPassword(Resource):
    def post(self):
        url = current_app.config["DOMAIN"] + '/account/reset-password/?'
        try:
            body = request.get_json()
            email = body.get('email')
            if not email:
                raise SchemaValidationError
            # verify user.
            user = User.objects.get(email=email)
            if not user:
                raise EmailDoesnotExistsError
            # set expired time for forgot password token,
            expires = datetime.timedelta(hours=1)
            reset_token = create_access_token(str(user.id), expires_delta=expires)

            # sending email
            send_email('[Zulemaz] Reset Your Password',
                              sender='vienbui39dj3e33@gmail.com',
                              recipients=[user.email],
                              text_body=render_template('email/reset_password.txt',
                                                        url=url + reset_token),
                              html_body=render_template('email/reset_password.html',
                                                        url=url + reset_token))
            return {'success': True, 'data': {}}
        except Exception as e:
            return {'success':False,'data':{}}



class ResetPassword(Resource):
    @jwt_required()
    def post(self):
        url = request.host_url + 'reset/'
        try:
            body = request.get_json()
            user_id = get_jwt_identity()
            password = body.get('password')
            # verify user.
            user = User.objects.get(id=user_id)

            user.modify(password=password)
            user.hash_password()
            user.save()
            send_email('[Zulemaz] Password reset successful',
                       sender='support@zulemaz.com',
                       recipients=[user.email],
                       text_body='Password reset was successful',
                       html_body='<p>Password reset was successful</p>')

            return {'success': True, 'data': {}}
        except Exception as e:
            raise {'success': False, 'data': {}}