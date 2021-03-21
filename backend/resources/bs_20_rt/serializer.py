from marshmallow import Schema, fields, post_load, ValidationError, INCLUDE
import json

class BS20_QT(Schema):
    class Meta:
        unknown = INCLUDE
    @post_load
    def loader(self, data, **kwargs):
        if data['symbol']:
            data['symbol'] = data['symbol'].split(',')
        data['key'] = 'BS_20'
        if data['watch_mode']:
            if data['watch_mode'] == '3 days':
                data['key'] = "BS_20_3D"
        return data
