import json
import requests
import os
from pathlib import Path
from datetime import datetime

list_req = {"Leader": "https://mkw-socket.vndirect.com.vn/mkwsocket/leaderlarger?index=VNINDEX",
            "Liquidity": "https://mkw-socket.vndirect.com.vn/mkwsocket/liquidity?index=VNINDEX",
            "Macketcap": "https://mkw-socket.vndirect.com.vn/mkwsocket/marketcap?index=VNINDEX",
            "Foreignmap": "https://mkw-socket.vndirect.com.vn/mkwsocket/foreignmap?index=HOSE"}
output_dir = "craw_data"

Path(output_dir).mkdir(parents=True, exist_ok=True)

for req in list_req:
    Path(f'{output_dir}/{req}').mkdir(parents=True, exist_ok=True)
    today = datetime.now().strftime("%d_%m_%Y")
    r = requests.get(list_req[req])
    open(f'{output_dir}/{req}/{today}', 'wb').write(r.content)


