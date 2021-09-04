from flask import Response, request
from backend.database.models import Order
from backend.database.db import ConnectDB
from flask_restful import Resource
from backend.utils.paging import getDefault, get_data_with_page
from sqlalchemy import or_
from backend.utils.response import success, clear_sa_ss, error
from flask_jwt_extended import jwt_required


class OrdersApi(Resource):
    @jwt_required()
    def get(self):
        session = ConnectDB()
        try:
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
        finally:
            session.close()

    @jwt_required()
    def post(self):
        session = ConnectDB()
        data = request.get_json()
        order = Order(**data)
        session.add(order)
        session.commit()
        return success("", clear_sa_ss(order))


class OrderApi(Resource):
    @jwt_required()
    def put(self, id):
        session = ConnectDB()
        try:
            data = request.get_json()
            order = session.query(Order).filter(Order.id == id).update(data)
            session.commit()
            return success("", order)
        except :
            return error("", "")
        finally:
            session.close()

    @jwt_required()
    def delete(self, id):
        session = ConnectDB()
        try:
            session.query(Order).filter(Order.id == id).delete()
            session.commit()
            return success("", "")
        except Exception:
            return error("", "")
        finally:
            session.close

    @jwt_required()
    def get(self, id):
        session = ConnectDB()
        try:
            order = session.query(Order).filter_by(id=id).one()
            return success("", clear_sa_ss(order))
        except:
            return error("", "")
        finally:
            session.close()
