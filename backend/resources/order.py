from flask import Response, request
from database.models import Order
from database.db import ConnectDB
from flask_restful import Resource
from utils.paging import getDefault, get_data_with_page
from sqlalchemy import or_
from utils.response import success, clear_sa_ss, error


class OrdersApi(Resource):
    def get(self):
        try:
            session = ConnectDB()()
            parameters = request.args
            limit, page, offset, order_by = getDefault(
                parameters, Order
            )

            if 'search' in parameters and parameters['search'] != '':
                query = session.query(Order).filter(
                    or_(key.like(('%' + parameters['search'] + '%'))
                        for key in Order.__table__.columns)
                ).order_by(order_by).offset(offset).limit(limit)
            else:
                query = session.query(Order).\
                    order_by(order_by).offset(offset).limit(limit)
            total_count = query.count()
            orders = query.all()
            return success('', get_data_with_page(clear_sa_ss(orders), limit, page, total_count))
        except:
            return error("", "")

    def post(self):
        try:
            session = ConnectDB()()
            data = request.get_json()
            order = Order(**data)
            session.add(order)
            session.commit()
            return success("", clear_sa_ss(order))
        except:
            return error("", "")


class OrderApi(Resource):
    def put(self, id):
        try:
            data = request.get_json()
            session = ConnectDB()()
            order = session.query(Order).filter(Order.id == id).update(data)
            session.commit()
            return success("", order)
        except :
            return error("", "")

    def delete(self, id):
        try:
            session = ConnectDB()()
            session.query(Order).filter(Order.id == id).delete()
            session.commit()
            return success("", "")
        except Exception:
            return error("", "")

    def get(self, id):
        try:
            session = ConnectDB()()
            order = session.query(Order).filter_by(id=id).one()
            return success("", clear_sa_ss(order))
        except:
            return error("", "")
