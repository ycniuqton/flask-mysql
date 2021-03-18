from flask import Response, request
from database.models import Order
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError,  InternalServerError
from werkzeug.utils import secure_filename
import os
from flask import current_app

# only accept those file type.
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class OrdersApi(Resource):
    # Get list order. But not yet using now.
    def get(self):
        query = Order.objects()
        orders = Order.objects().to_json()
        return Response(orders, mimetype="application/json", status=200)
    # Create new order, your csv file will be saved in /public/design/

    def post(self):
        body = request.get_json()
        order = Order(**body)
        order.save()
        id = order.id
        return {'success': True, 'data': {'id': str(id)}}



# edit and delete order database, but not yet apply.
class OrderApi(Resource):
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
