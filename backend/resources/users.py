from flask import Response, request
from database.models import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, MovieAlreadyExistsError, InternalServerError, \
    UpdatingMovieError, DeletingMovieError, MovieNotExistsError
import json



class UserApi(Resource):
    @jwt_required()
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            body = request.get_json()
            if 'password_new' in body and 'password_old' in body:
                user = User.objects.get(id=id)
                if user.check_password(body['password_old']):
                    user.modify(password=body['password_new'])
                    user.hash_password()
                    user.save()
                    return {'success': True, 'data': {}}
                else:
                    return {'success': False, 'data': {}}
            User.objects.get(id=id).update(**body)
            return {'success': True, 'data': {}}
        except Exception:
            return {'success': False, 'data': {}}

    @jwt_required()
    def get(self, id):
        try:
            user = User.objects.get(id=id).to_json()
            user = json.loads(user)
            del user['password']
            return {'success': True, 'data': user}
        except Exception:
            return {'success': False, 'data': ''}


