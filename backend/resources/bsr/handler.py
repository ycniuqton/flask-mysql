from flask import Response, request
from database.models import *
from flask_restful import Resource
from .serializer import *
import redis
import json
import os
from flask import current_app
import time
r = redis.Redis('192.168.150.146', db=0)


static_data = {
    'VHM': {'buy': 100000, 'sell': 299191, 'bsr': 0.721*100},
    'VRE': {'buy': 100000, 'sell': 299191, 'bsr': 0.21*100},
    'VIC': {'buy': 100000, 'sell': 299191, 'bsr': 0.421*100},
}

class BSR(Resource):
    def get(self):
        query_string = dict(request.args)
        query_string = BSR_QT().load(query_string)
        try:
            static_data = json.loads(r.get(query_string['key']))
        except:
            static_data = {}
        result = dict(filter(lambda elem: elem[0] in query_string['symbol'], static_data.items()))
        return {'success': True, 'data': result}

    def post(self):
        return {'success': True, 'data': {'id': 1}}
