from .db import db
from mongoengine import *

class Order(db.Document):
    name = StringField(required=True, unique=True)
    casts = ListField(db.StringField(), required=True)
    genres = ListField(db.StringField(), required=True)

class BSTimeline(db.Document):
    date = DateTimeField(required=True)
    symbol = StringField(required=True)
    buy = IntField(required=True)
    sell = IntField(required=True)
    current = IntField(required=True)
    average = IntField(required=True)
    time_stamp = IntField(required=True)

class BSHistory(db.Document):
    date = DateTimeField(required=True)
    symbol = StringField(required=True)
    volumn = IntField(required=True)
    price = IntField(required=True)
    time_stamp = IntField(required=True)



