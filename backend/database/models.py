from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import *

from sqlalchemy import *

Base = declarative_base()


class Order(Base):
    __tablename__ = 'order'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    casts = Column(String)
    genres = Column(String)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    ip = Column(String)

    def get_data(self):
        return {
            "id": self.ip,
            "name": self.name,
            "email": self.email,
            "ip": self.ip
        }