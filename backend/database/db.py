from sqlalchemy.ext.declarative import *
import simplejson as json
from sqlalchemy.orm import *
from sqlalchemy import *
from envi import *


def ConnectDB():
    engine = create_engine(f'mysql+mysqldb://{SQL_SERVER.user}:{SQL_SERVER.password}@{SQL_SERVER.host}/{SQL_SERVER.db}?charset=utf8')
    Session = sessionmaker(bind=engine)
    return Session

def initialize_db(a):
    pass