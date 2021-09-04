from .order import *
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from backend.utils.response import success, error, clear_sa_ss
from backend.database.db import ConnectDB
from backend.database.models import User
import bcrypt


def init_auth(app):
    jwt = JWTManager(app)

    @app.route("/api/login", methods=["POST"])
    def login():
        session = ConnectDB()
        try:
            username = request.json.get("email", None)
            password = request.json.get("password", None)
            if username == "" or password == "":
                return error("Bad username or password", "")
            user = session.query(User).filter_by(email=username).first()
            if user and bcrypt.checkpw(password.encode(), user.password.encode()):
                access_token = create_access_token(identity=username, additional_claims=user.get_data())
                return success("", {"access_token": access_token})
            else:
                return error("Bad username or password", "")
        except:
            return error("Bad username or password", "")
        finally:
            session.close()

    @app.route("/api/signup", methods=["POST"])
    def signup():
        session = ConnectDB()
        try:
            name = request.json.get("name", None)
            username = request.json.get("email", None)
            password = request.json.get("password", None)
            ip = request.remote_addr

            if username == "" or password == "":
                return error("Bad username or password", "")
            user = session.query(User).filter_by(email=username).first()
            if user:
                return error("User is existed", "")
            user = User(name=name, password=bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode(), email=username, ip=ip)
            session.add(user)
            session.commit()

            return success("", clear_sa_ss(user))
        except:
            return error("Bad username or password", "")
        finally:
            session.close()


