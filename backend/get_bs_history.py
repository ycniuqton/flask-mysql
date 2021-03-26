import redis
import json
import requests
from datetime import datetime
from utils.utils import  *
r = redis.Redis('127.0.0.1', db=0)

# requets api
symbols = ['SHS', 'PNJ', 'LDG', 'VRE', 'BCM', 'KBC', 'IDC', 'HCM', 'VGC', 'POM', 'LCG', 'SAB', 'PVM', 'SNZ', 'DRI',
           'HPX', 'SZC', 'GVR', 'TPB', 'NKG', 'VPB', 'BSR', 'SHB', 'DCM', 'HSG', 'VIC', 'PET', 'SBT', 'VCB', 'REE',
           'DRH', 'VCI', 'VND', 'BSI', 'GAS', 'STB', 'HPG', 'PLX', 'KDH', 'PVD', 'HAX', 'BID', 'TCB', 'MBB', 'DXG',
           'SSI', 'VHM', 'POW', 'HDB']
# symbols = ['SHS', 'PNJ']
def get_history(symbol):
    req = requests.get('https://trading.pinetree.vn/getliststocktrade/'+symbol)
    open(f'log/bs_history/{symbol}_{datetime.now().strftime("%d_%m")}.json', 'wb').write(req.content)
    data = json.loads(req.content.decode())
    return data

# def get_redis_json(data_key):
#     try:
#         return json.loads(r.get('BS_HISTORY_D0').decode())
#     except:
#         return {}
def get_bs_data():
    today = datetime.now().strftime("%d_%m_%Y")
    history = {}
    for symbol in symbols:
        print('-', symbol)
        data = get_history(symbol)
        history[symbol] = data
    bs_today = r.get('BS_HISTORY_TODAY').decode()
    if bs_today == today:
        r.set('BS_HISTORY_D0', json.dumps(history))
    else:
        r.set('BS_HISTORY_TODAY', today)
        tmp = r.get('BS_HISTORY_D1')
        if tmp is None:
            tmp = b'{}'
        r.set('BS_HISTORY_D2', tmp)
        tmp = r.get('BS_HISTORY_D0')
        if tmp is None:
            tmp = b'{}'
        r.set('BS_HISTORY_D1', tmp)
        r.set('BS_HISTORY_D0', json.dumps(history))

get_bs_data()
#
print('BS_HISTORY_TODAY')



# calculate
def update_bs20(watch_mode='realtime'):
    new_static_data = {}
    if watch_mode == 'realtime':
        print('mode = realtime')
        data_key = 'BS_20'
        history = get_redis_json('BS_HISTORY_D0')
    else:
        print('mode = 3 days')
        data_key = 'BS_20_3D'
        history_d1 = get_redis_json('BS_HISTORY_D1')
        history_d2 = get_redis_json('BS_HISTORY_D2')
        history = get_redis_json('BS_HISTORY_D0')
        for i in history:
            history[i].extend(history_d1[i])
            history[i].extend(history_d2[i])
    for i in symbols:
        print(".", end=' ')
        if i not in history:
            continue
        data = history[i]
        price_history = {}
        total = 0

        # get price history
        for section in data:
            price = section['lastPrice']
            if section['lastPrice'] in price_history:
                price_history[price] += section['lastVol'] * 10
            else:
                price_history[price] = section['lastVol'] * 10
            total += section['lastVol'] * 10

        price_pace = price_history.keys()
        try:
            max_price = max(price_pace)
            min_price = min(price_pace)
        except:
            continue
        r20 = total * 20 / 100

        #  calculate b20
        count_v = 0
        for p in sorted(price_pace):
            count_v += price_history[p]
            if count_v >= r20:
                break
        b20 = p

        #  calculate s20
        count_v = 0
        for p in sorted(price_pace, reverse=True):
            count_v += price_history[p]
            if count_v >= r20:
                break
        s20 = p

        new_static_data[i] = {
            'b20': b20 * 1000,
            's20': s20 * 1000,
            'lp': min_price * 1000,
            'hp': max_price * 1000
        }
    print("")

    # update static_data
    try:
        static_data = get_redis_json(data_key)
    except:
        static_data = {}
    static_data.update(new_static_data)
    r.set(data_key, json.dumps(static_data))

def update_bsr(watch_mode='realtime'):
    new_static_data = {}
    if watch_mode == 'realtime':
        print('mode = realtime')
        data_key = 'BSR'
        history = get_redis_json('BS_HISTORY_D0')
    else:
        print('mode = 3 days')
        data_key = 'BSR_3D'
        history_d1 = get_redis_json('BS_HISTORY_D1')
        history_d2 = get_redis_json('BS_HISTORY_D2')
        history = get_redis_json('BS_HISTORY_D0')
        for i in history:
            history[i].extend(history_d1[i])
            history[i].extend(history_d2[i])
    for i in symbols:
        print(".", end=' ')
        if i not in history:
            continue
        data = history[i]
        price_history = {}
        total = 0

        # get price history
        for section in data:
            price = section['lastPrice']
            if section['lastPrice'] in price_history:
                price_history[price] += section['lastVol'] * 10
            else:
                price_history[price] = section['lastVol'] * 10
            total += section['lastVol'] * 10

        price_pace = price_history.keys()
        max_price = max(price_pace)
        min_price = min(price_pace)
        r20 = total * 20 / 100

        #  calculate b20
        count_v = 0
        for p in sorted(price_pace):
            count_v += price_history[p]
            if count_v >= r20:
                break
        b20 = p

        #  calculate s20
        count_v = 0
        for p in sorted(price_pace, reverse=True):
            count_v += price_history[p]
            if count_v >= r20:
                break
        s20 = p

        new_static_data[i] = {
            'b20': b20 * 1000,
            's20': s20 * 1000,
            'lp': min_price * 1000,
            'hp': max_price * 1000
        }
    print("")

    # update static_data
    try:
        static_data = get_redis_json(data_key)
    except:
        static_data = {}
    static_data.update(new_static_data)
    r.set(data_key, json.dumps(static_data))


update_bs20('3 days')
