from .order import OrdersApi, OrderApi


def initialize_routes(api):
    api.add_resource(OrdersApi, '/api/orders')
    api.add_resource(OrderApi, '/api/orders/<id>')




