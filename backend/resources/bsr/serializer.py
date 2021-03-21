from marshmallow import Schema, fields, post_load, ValidationError, INCLUDE
import json

class BSR_QT(Schema):
    class Meta:
        unknown = INCLUDE
    @post_load
    def loader(self, data, **kwargs):
        if data['symbol']:
            data['symbol'] = data['symbol'].split(',')
        data['key'] = 'BSR'
        if data['watch_mode']:
            if data['watch_mode'] == '3 days':
                data['key'] = "BSR_3D"
        return data
