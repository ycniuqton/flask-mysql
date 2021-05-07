from utils.flask_kju_lite import gen_api_lite
from database.models import Order
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from utils.response import success, error
from flask import Response, request



def initialize_routes(app):
    gen_api_lite(app, Order, "/api/orders")
    init_auth(app)

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



