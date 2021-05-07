from flask import Flask, request, jsonify, Response, abort
import copy

def success(message, data):
	result = {'status': 1, 'message': str(message), 'data': data}
	resp = jsonify(result)
	return resp

def error(message, data):
	result = {'status': 0, 'message': str(message), 'data': data}
	resp = jsonify(result)
	return resp

def clear_sa_ss(data):
	if type(data) is list:
		new_data = list(map(lambda x: x.__dict__, copy.copy(data)))
		for item in new_data:
			if "_sa_instance_state" in item:
				del item["_sa_instance_state"]
	else:
		new_data = copy.copy(data.__dict__)
		if "_sa_instance_state" in new_data:
			del new_data["_sa_instance_state"]
	return new_data

