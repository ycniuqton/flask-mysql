from flask import Response, request
from database.models import *
from flask_restful import Resource
from .serializer import *
import redis
import json
import os
from flask import current_app
import time
from envi import *
r = redis.Redis(REDIS, db=0)


static_data = {
    'VIC': {'b20': 107000, 's20': 106000},
    'VHM': {'b20': 99000, 's20': 98000},
    'VRE': {'b20': 35000, 's20': 34200}
}

class BS_20(Resource):
    def get(self):
        query_string = dict(request.args)
        query_string = BS20_QT().load(query_string)
        try:
            static_data = json.loads(r.get(query_string['key']))
        except:
            static_data = {}
        result = dict(filter(lambda elem: elem[0] in query_string['symbol'], static_data.items()))
        return {'success': True, 'data': result}

    def post(self):
        return {'success': True, 'data': {'id': 1}}
