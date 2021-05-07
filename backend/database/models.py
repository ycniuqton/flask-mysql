from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import *
from sqlalchemy import *

Base = declarative_base()



class Order(Base):
    __tablename__ = 'order'
    id = Column(Integer, primary_key=True)
    name = Column(String(500))
    casts = Column(String(500))
    genres = Column(String(500))



