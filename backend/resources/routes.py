from .order import OrdersApi, OrderApi
from .resources import BSTimelineAPI, BSTimelineCollection


def initialize_routes(api):
    api.add_resource(OrdersApi, '/api/orders')
    api.add_resource(OrderApi, '/api/orders/<id>')

    api.add_resource(BSTimelineCollection, '/api/bstimeline')
    api.add_resource(BSTimelineAPI, '/api/bstimeline/<id>')




