from .order import *
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from utils.response import success, error

def initialize_routes(api, app):
    # init authentication
    init_auth(app)

    # define resource
    api.add_resource(OrdersApi, '/api/orders')
    api.add_resource(OrderApi, '/api/orders/<int:id>', methods=['PUT', 'DELETE', 'GET'])

def init_auth(app):
    jwt = JWTManager(app)

    @app.route("/api/login", methods=["POST"])
    def login():
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if username != "test" or password != "test":
            return error("Bad username or password", "")

        access_token = create_access_token(identity=username)
        return success("", {"access_token": access_token})

    @app.route("/api/signup", methods=["POST"])
    def signup():
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if username != "test" or password != "test":
            return error("Bad username or password", "")

        access_token = create_access_token(identity=username)
        return success("", {"access_token": access_token})


