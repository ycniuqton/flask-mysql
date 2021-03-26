import websocket
import _thread
import time

def on_message(ws, message):
    print (message)
    if message == '3probe':
        ws.send("5")
    print (1)

def on_error(ws, error):
    print (error)

def on_close(ws):
    print ("### closed ###")

def on_open(ws):
    ws.send("2probe")
    # def run(*args):
    #     for i in range(30000):
    #         time.sleep(1)
    #         ws.send("2probe")
    #     time.sleep(1)
    #     ws.close()
    #     print ("thread terminating...")
    # _thread.start_new_thread(run, ())


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("wss://trading.pinetree.vn/socket.io/?EIO=3&transport=websocket&sid=iGOBHEdqkXHGtWvbAWxM",
                                on_message = on_message,
                                on_error = on_error,
                                on_close = on_close)
    ws.on_open = on_open

    ws.run_forever()