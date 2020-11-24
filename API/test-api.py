import json

import pymongo
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from flask import Flask, Response, request

app = Flask(__name__)
try:
    mongo = pymongo.MongoClient(host='localhost', port=27017, serverSelectionTimeoutMS=1000)
    db = mongo["testapi"]
    mongo.server_info()  # trigger exception if cannot connect to database
except Exception as e:
    print(e)


@app.route('/api/v1/home', methods=['GET'])
def index():
    return {'API': "Flask API Loaded Successfully!"}


@app.route("/api/v1/createUser", methods=['POST'])
def create_user():
    try:
        user = {'name': request.form['name'], 'lastName': request.form['lastName']}
        dbResponse = db.users.insert_one(user)
        return Response(
            response=json.dumps({'message': 'User created successfully', 'id': f"{dbResponse.inserted_id}"}),
            status=200,
            mimetype='application/json')
    except Exception as e:
        print(e)


@app.route("/api/v1/users", methods=['GET'])
def get_users():
    try:
        data = db["users"].find()
        dataNew = dumps(data)
        print(loads(dataNew))
        return Response(
            response=json.dumps({
                "message": "Users list fetched successfully!",
                "data": dataNew
            }),
            status=200,
            mimetype="application/json"
        )
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({
                "message": "Cannot get users due to some error",
            }),
            status=500,
            mimetype="application/json"
        )


@app.route("/api/v1/updateUser/<idx>", methods=['PATCH'])
def updateUser(idx):
    try:
        dbResponse = db["users"].update_one(
            {"_id": ObjectId(idx)},
            {"$set": {"name": request.form["name"]}}
        )
        for attr in dir(dbResponse):
            print(attr)

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({
                "message": "Cannot update users due to some error",
            }),
            status=500,
            mimetype="application/json"
        )


if __name__ == '__main__':
    app.run(debug=True)
