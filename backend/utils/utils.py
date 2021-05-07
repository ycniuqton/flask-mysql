import redis
import json
import requests
from datetime import datetime

r = redis.Redis('127.0.0.1', db=0)

def get_redis_json(data_key):
    try:
        return json.loads(r.get(data_key).decode())
    except:
        return {}


def set_redis_json(data_key, data):
    try:
        return r.set(data_key, json.dumps(data))
    except:
        return r.set(data_key, json.dumps({}))

def cpy_redis_data(from_key, to_key):
    data = r.get(from_key)
    if data is not None:
        r.set(to_key, data)
