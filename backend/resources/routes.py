from .order import *


def initialize_routes(api):
    api.add_resource(OrdersApi, '/api/orders')
    api.add_resource(OrderApi, '/api/order')



