from flask import Response, request
from database.models import *
from flask_restful import Resource
import os
from flask import current_app




class BSTimelineCollection(Resource):
    def get(self):
        items = BSTimeline.objects().to_json()
        return Response(items, mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        items = BSTimeline(**body)
        items.save()
        id = items.id
        return {'success': True, 'data': {'id': str(id)}}


class BSTimelineAPI(Resource):
    def put(self, id):
        try:
            item = BSTimeline.objects.get(id=id)
            body = request.get_json()
            item.objects.get(id=id).update(**body)
            return '', 200
        except Exception:
            return '', 200


    def delete(self, id):
        try:
            item = BSTimeline.objects.get(id=id)
            item.delete()
            return '', 200
        except Exception:
            return '', 200

    def get(self, id):
        try:
            item = BSTimeline.objects.get(id=id).to_json()
            return Response(item, mimetype="application/json", status=200)
        except Exception:
            return '', 200
