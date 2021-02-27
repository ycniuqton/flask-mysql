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

# only accept those file type.
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class OrdersApi(Resource):
    # Get list order. But not yet using now.
    @jwt_required()
    def get(self):
        query = Order.objects()
        orders = Order.objects().to_json()
        return Response(orders, mimetype="application/json", status=200)
    # Create new order, your csv file will be saved in /public/design/
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

        send_email('[Zulemaz] Creating order successfully ',
                   sender='support@zulemaz.com',
                   recipients=[user['email']],
                   text_body='[Zulemaz] New subcription',
                   html_body=f'<h1>Creating order successfully</h1>')

        return {'success':True,'data':{}}


# edit and delete order database, but not yet apply.
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
