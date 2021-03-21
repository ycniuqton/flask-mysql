from .resources import BSTimelineAPI, BSTimelineCollection
from .bs_20_rt import BS_20
from .bsr import BSR


def initialize_routes(api):
    api.add_resource(BSTimelineCollection, '/api/bstimeline')
    api.add_resource(BSTimelineAPI, '/api/bstimeline/<id>')

    api.add_resource(BS_20, '/api/bs20')

    api.add_resource(BSR, '/api/bsr')




