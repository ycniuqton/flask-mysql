from flask import Response, request
from database.db import ConnectDB
from utils.paging import getDefault, get_data_with_page
from sqlalchemy import or_
from utils.response import success, clear_sa_ss, error
from flask_jwt_extended import jwt_required

def gen_api_lite(app, ThisModel, url, urls=False):
    if not urls:
        urls = url+"/<int:id>"
    @app.route(url, methods=['GET', 'POST'])
    @jwt_required()
    def resources():
        if request.method == 'GET':
            try:
                session = ConnectDB()()
                parameters = request.args
                limit, page, offset, order_by = getDefault(
                    parameters, ThisModel
                )

                if 'search' in parameters and parameters['search'] != '':
                    query = session.query(ThisModel).filter(
                        or_(key.like(('%' + parameters['search'] + '%'))
                            for key in ThisModel.__table__.columns)
                    ).order_by(order_by).offset(offset).limit(limit)
                else:
                    query = session.query(ThisModel). \
                        order_by(order_by).offset(offset).limit(limit)
                total_count = query.count()
                items = query.all()
                return success('', get_data_with_page(clear_sa_ss(items), limit, page, total_count))
            except:
                return error("", "")
        elif request.method == 'POST':
            try:
                session = ConnectDB()()
                data = request.get_json()
                item = ThisModel(**data)
                session.add(item)
                session.commit()
                return success("", clear_sa_ss(item))
            except:
                return error("", "")

    @app.route(urls, methods=['GET', 'DELETE', 'PUT'])
    @jwt_required()
    def resource(id):
        if request.method == 'GET':
            try:
                session = ConnectDB()()
                item = session.query(ThisModel).filter_by(id=id).one()
                return success("", clear_sa_ss(item))
            except:
                return error("", "")
        elif request.method == 'PUT':
            try:
                data = request.get_json()
                session = ConnectDB()()
                item = session.query(ThisModel).filter(ThisModel.id == id).update(data)
                session.commit()
                return success("", item)
            except:
                return error("", "")
        elif request.method == 'DELETE':
            try:
                session = ConnectDB()()
                session.query(ThisModel).filter(ThisModel.id == id).delete()
                session.commit()
                return success("", "")
            except Exception:
                return error("", "")