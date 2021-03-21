import redis
import json

r = redis.Redis('192.168.150.146', db=0)

# requets api
data = []
# insert to log

# calculate
new_static_data = {}
for i in data:
    price_history = {}
    total = 0

    # get price history
    for price in i:
        if price in price_history:
            price_history[price] += i[price]['price']
        else:
            price_history[price] = i[price]['price']
        total += i[price]['volume']

    price_pace = price_history.keys()
    max_price = max(price_pace)
    min_price = min(price_pace)
    r20 = total*20/100

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
        'b20': b20,
        's20': s20,
        'lp': min_price,
        'hp': max_price
    }

# update static_data
static_data = json.loads(r.get('BS_20'))
static_data.update(new_static_data)
r.set('BS_20', json.dumps(static_data))
