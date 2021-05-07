from .order import *
from utils.flask_kju_lite import gen_api_lite
from database.models import Order


def initialize_routes(app):
    gen_api_lite(app, Order, "/api/orders")



