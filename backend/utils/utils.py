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


def parse_bs_volumn(symbol):
    buy = [symbol['g1'], symbol['g2'], symbol['g3']]
    sell = [symbol['g4'], symbol['g5'], symbol['g6']]

    buy = map(lambda x: int(x.split('|')[1]), buy)
    sell = map(lambda x: int(x.split('|')[1]), sell)

    buy = sum(buy)
    sell = sum(sell)

    return buy, sell


def set_redis_json(data_key, data):
    try:
        return r.set(data_key, json.dumps(data))
    except:
        return r.set(data_key, json.dumps({}))

def cpy_redis_data(from_key, to_key):
    data = r.get(from_key)
    if data is not None:
        r.set(to_key, data)

def cal_bsr_3d(symbol, d1, d2, today):
    if symbol in d1:
        today['sell'] += d1[symbol]['sell']
        today['buy'] += d1[symbol]['buy']
    if symbol in d2:
        today['sell'] += d2[symbol]['sell']
        today['buy'] += d2[symbol]['buy']
    today['bsr'] = today['buy']/(today['buy'] + today['sell'] + 1) * 100
    return today


