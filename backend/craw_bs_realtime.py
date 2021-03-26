import redis
import json
import requests
from datetime import datetime

from utils.utils import *
r = redis.Redis('127.0.0.1', db=0)

# while 1:
watch_list = ['SHS', 'PNJ', 'LDG', 'VRE', 'BCM', 'KBC', 'IDC', 'HCM', 'VGC', 'POM', 'LCG', 'SAB', 'PVM', 'SNZ', 'DRI',
       'HPX', 'SZC', 'GVR', 'TPB', 'NKG', 'VPB', 'BSR', 'SHB', 'DCM', 'HSG', 'VIC', 'PET', 'SBT', 'VCB', 'REE',
       'DRH', 'VCI', 'VND', 'BSI', 'GAS', 'STB', 'HPG', 'PLX', 'KDH', 'PVD', 'HAX', 'BID', 'TCB', 'MBB', 'DXG',
       'SSI', 'VHM', 'POW', 'HDB']



# r.delete('BSR_TODAY')
# r.delete('BSR_3D')
# r.delete('BSR_D0')
# r.delete('BSR_D1')
# r.delete('BSR_D2')

def update_bsr():
    req = requests.get(f'https://trading.pinetree.vn/getliststockdata/{",".join(watch_list)}')
    try:
        bsr_today = r.get('BSR_TODAY').decode()
    except:
        bsr_today = ''
    today = datetime.now().strftime("%d_%m_%Y")

    if bsr_today == today:
        bsr_data = get_redis_json('BSR_D0')
        bsr_3d_data = get_redis_json('BSR_3D')
        for i in json.loads(req.content.decode()):
            if i['sym'] in bsr_data:
                symbol = bsr_data[i['sym']]
            else:
                symbol = {
                    'buy': 0,
                    'sell': 0,
                    'bsr': 1
                }
            buy, sell = parse_bs_volumn(i)
            symbol['buy'] += buy*10
            symbol['sell'] += sell*10
            symbol['bsr'] = symbol['buy']/(symbol['buy'] + symbol['sell'] + 1) * 100
            bsr_data[i['sym']] = symbol

            # make bsr_3d
            if i['sym'] in bsr_3d_data:
                symbol_3d = bsr_3d_data[i['sym']]
            else:
                symbol_3d = {
                    'buy': 0,
                    'sell': 0
                }
            symbol_3d['buy'] += buy * 10
            symbol_3d['sell'] += sell * 10
            symbol_3d['bsr'] = symbol_3d['buy'] / (symbol_3d['buy'] + symbol_3d['sell'] + 1) * 100
            bsr_3d_data[i['sym']] = symbol_3d
        set_redis_json('BSR_D0', bsr_data)
        set_redis_json('BSR_3D', bsr_3d_data)

    else:
        r.set('BSR_TODAY', today)
        bsr_data = {}
        bsr_d1_data = get_redis_json('BSR_D0')
        bsr_d2_data = get_redis_json('BSR_D1')
        bsr_3d_data = {}
        for i in json.loads(req.content.decode()):
            symbol = {}
            buy, sell = parse_bs_volumn(i)
            symbol['buy'] = buy*10
            symbol['sell'] = sell*10
            symbol['bsr'] = symbol['buy']/(symbol['buy'] + symbol['sell'] + 1) * 100

            # make bsr_3d
            tmp = cal_bsr_3d(i['sym'], bsr_d1_data, bsr_d2_data, symbol)
            bsr_3d_data[i['sym']] = tmp

        cpy_redis_data('BSR_D1', 'BSR_D2')
        cpy_redis_data('BSR_D0', 'BSR_D1')
        set_redis_json('BSR_D0', bsr_data)
        set_redis_json('BSR_3D', bsr_3d_data)



update_bsr()





