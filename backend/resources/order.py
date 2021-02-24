from flask import Response, request
from database.models import Order, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError,  InternalServerError
from werkzeug.utils import secure_filename
import os
from services.mail_service import send_email
from flask import current_app


ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class OrdersApi(Resource):
    @jwt_required()
    def get(self):
        query = Order.objects()
        orders = Order.objects().to_json()
        return Response(orders, mimetype="application/json", status=200)

    @jwt_required()
    def post(self):
        # save file
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(f'./public/design/{filename}')
        #send mail
        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)

        send_email('[Hejjijein] Creating order successfully ',
                   sender='support@Hejjijein.com',
                   recipients=[user['email']],
                   text_body='[Hejjijein] New subcription',
                   html_body=f'<h1>Creating order successfully</h1>')

        return {'success':True,'data':{}}

        # try:
        #     user_id = get_jwt_identity()
        #     body = request.get_json()
        #     user = User.objects.get(id=user_id)
        #     order = Order(**body, added_by=user)
        #     order.save()
        #     user.update(push__orders=order)
        #     user.save()
        #     id = order.id
        #     return {'id': str(id)}, 200
        # except (FieldDoesNotExist, ValidationError):
        #     raise SchemaValidationError
        # except Exception as e:
        #     raise InternalServerError


class OrderApi(Resource):
    @jwt_required
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            order = Order.objects.get(id=id, added_by=user_id)
            body = request.get_json()
            Order.objects.get(id=id).update(**body)
            return '', 200
        except InvalidQueryError:
            raise SchemaValidationError
        except Exception:
            raise InternalServerError

    @jwt_required
    def delete(self, id):
        try:
            user_id = get_jwt_identity()
            order = Order.objects.get(id=id, added_by=user_id)
            order.delete()
            return '', 200
        except Exception:
            raise InternalServerError

    def get(self, id):
        try:
            orders = Order.objects.get(id=id).to_json()
            return Response(orders, mimetype="application/json", status=200)
        except Exception:
            raise InternalServerError
