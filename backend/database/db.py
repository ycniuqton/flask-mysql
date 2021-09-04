from sqlalchemy.ext.declarative import *
import simplejson as json
from sqlalchemy.orm import *
from sqlalchemy import *
from envi import *
import sys, inspect
import database.models as mymodel
from sqlalchemy.orm.decl_api import DeclarativeMeta

def gen_engine():
    return create_engine(f'mysql+mysqldb://{SQL_SERVER.user}:{SQL_SERVER.password}@{SQL_SERVER.host}/{SQL_SERVER.db}?charset=utf8')

def ConnectDB():
    engine = gen_engine()
    Session = sessionmaker(bind=engine)
    return Session

def initialize_db(new=False):
    models = inspect.getmembers(mymodel, inspect.isclass)
    engine = gen_engine()
    for model in models:
        # print(model[1].__name__)
        if model[1].__class__.__name__ == "DeclarativeMeta" and model[1].__name__ != "Base":
            this_table = model[1]
            if new:
                this_table.__table__.drop(engine)
                this_table.__table__.create(engine)
            elif not engine.has_table(this_table.__tablename__):
                this_table.__table__.create(engine)
