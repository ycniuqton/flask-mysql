from sqlalchemy.ext.declarative import *
import simplejson as json
from sqlalchemy.orm import *
from sqlalchemy import *
from backend.envi import *
import sys, inspect
import backend.database.models as mymodel
# from sqlalchemy.orm.decl_api import DeclarativeMeta
import os


def gen_engine():
    # return create_engine(f'mysql+mysqldb://{SQL_SERVER.user}:{SQL_SERVER.password}@{SQL_SERVER.host}/{SQL_SERVER.db}?charset=utf8')
    cwd = os.getcwd()
    return create_engine(f'sqlite:///./db.db')


def ConnectDB():
    engine = gen_engine()
    Session = sessionmaker(bind=engine)
    return Session()


def initialize_db(new=False):
    models = inspect.getmembers(mymodel, inspect.isclass)
    engine = gen_engine()
    for model in models:
        # print(model[1].__name__)
        if model[1].__class__.__name__ == "DeclarativeMeta" and model[1].__name__ != "Base":
            this_table = model[1]
            if new:
                try:
                    this_table.__table__.drop(engine)
                except:
                    pass
                this_table.__table__.create(engine)
            elif not engine.has_table(this_table.__tablename__):
                this_table.__table__.create(engine)
