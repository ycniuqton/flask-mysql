from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from database.db import initialize_db
from flask_restful import Api
from utils.errors import errors

app = Flask(__name__)
app.config.from_pyfile('env.yaml')

# imports requiring app and mail
from resources.routes import initialize_routes

api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

initialize_db(app)
initialize_routes(api)

