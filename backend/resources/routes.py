from .order import *
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from backend.utils.response import success, error
from .authority import init_auth


def initialize_routes(api, app):
    # init authentication
    init_auth(app)

    # define resource
    api.add_resource(OrdersApi, '/api/orders')
    api.add_resource(OrderApi, '/api/orders/<int:id>', methods=['PUT', 'DELETE', 'GET'])
