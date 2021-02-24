from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash


class Order(db.Document):
    name = db.StringField(required=True, unique=True)
    casts = db.ListField(db.StringField(), required=True)
    genres = db.ListField(db.StringField(), required=True)
    added_by = db.ReferenceField('User')


class User(db.Document):
    business_name = db.StringField(requỉed=True)
    first_name = db.StringField(requỉed=True)
    last_name = db.StringField(requỉed=True)
    email = db.EmailField(required=True, unique=True)
    country = db.StringField(requỉed=True)
    fb_profile = db.StringField()
    refer_code = db.StringField()
    password = db.StringField(required=True)

    orders = db.ListField(db.ReferenceField('Order', reverse_delete_rule=db.PULL))


    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)



User.register_delete_rule(Order, 'added_by', db.CASCADE)