from flask import Response, request
from database.models import Order, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, InternalServerError
from services.mail_service import send_email
from flask import current_app


# handling contact function
class Contact(Resource):
    def post(self):
        # send mail
        data = request.get_json()
        send_email('New subcription',
                   sender='support@zulemaz.com',
                   recipients=[current_app.config["ADMIN_EMAIL"]],
                   text_body='[Zulemaz] New subcription',
                   html_body=f'<p>Email: {data["email"]}</p><p>First name: {data["first_name"]}</p>\
                   <p>Last name: {data["last_name"]}</p><p>Message: {data["message"]}</p>')

        return {'success': True, 'data': {}}


    def option(self):
        return {}

