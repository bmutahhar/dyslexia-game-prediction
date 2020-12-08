import json

import pymongo
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from flask import Flask, Response, request


app = Flask(__name__)
try:

    mongo = pymongo.MongoClient(
        "mongodb+srv://root:root@dyxsisml.anbn7.mongodb.net/playground?retryWrites=true&w=majority", serverSelectionTimeoutMS=1000)
    db = mongo["test"]

    mongo.server_info()  # trigger exception if cannot connect to database
    print("Connected to MongoDB server...")
except Exception as e:
    print(e)


@app.route('/api/v1/user/signup', methods=['POST'])
def signup():
    try:

        if request.method.strip() == "POST":
            content = request.json
            username = content['username']
            email = content['email']
            existingUsername = db.users.find_one({'username': username})
            if existingUsername is None:
                existingEmail = db.users.find_one({'email': email})
                if existingEmail is None:
                    print(
                        '****************************************************************')
                    print(username)
                    dbResponse = db.users.insert_one(content)
                    print(content['password'])
                    print("Record inserted successfully!")
                    print(dbResponse.inserted_id)
                    print(dbResponse.acknowledged)
                    print(
                        '****************************************************************')
                    return Response(
                        response=json.dumps(
                            {'message': 'Record inserted successfully', 'id': f"{dbResponse.inserted_id}", 'error': ""}),
                        status=200,
                        mimetype='application/json')
                else:
                    print("This email already exists")
                    return Response(
                        response=json.dumps(
                            {'message': 'Data could not be inserted in database', "error": "This email is already used by another user"}),
                        status=500,
                        mimetype='application/json')
            else:
                return Response(
                    response=json.dumps(
                        {'message': 'Data could not be inserted in database', "error": "Username already exists"}),
                    status=500,
                    mimetype='application/json')

        else:
            return Response(
                response=json.dumps(
                    {'message': 'Data could not be inserted in database', "error": "Only POST requests allowed on this URI"}),
                status=500,
                mimetype='application/json')

    except Exception as e:
        print(e)


@app.route('/api/v1/user/login', methods=['POST'])
def login():
    try:
        print('****************************************************************')
        if request.method.strip() == "POST":
            content = json.loads(request.json)
            username = content['username'].strip()
            password = content['password'].strip()
            print(username)
            dbResponse = db.users.find_one({'$or': [{'username': username}, {'email': username}]}, {
                                           'username': 1, 'password': 1})
            if dbResponse is not None:
                print('****************************************************************')
                print(dbResponse)
                print('****************************************************************')
                if dbResponse['password'].strip() == password:
                    return Response(
                        response=json.dumps(
                            {'message': 'Login successful!', "error": ""}),
                        status=200,
                        mimetype='application/json')
                else:
                    return Response(
                        response=json.dumps(
                            {'message': 'Password incorrect', "error": "Password incorrect"}),
                        status=500,
                        mimetype='application/json')
            elif dbResponse is None:
                return Response(
                    response=json.dumps(
                        {'message': 'Credentials not found', "error": "Username doesn't exist. Have you signed up yet?"}),
                    status=500,
                    mimetype='application/json')

        else:
            return Response(
                response=json.dumps(
                    {'message': 'Data could not be inserted in database', "error": "Only POST requests allowed on this URI"}),
                status=500,
                mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps(
                {'message': 'Data could not be inserted in database', "error": str(e)}),
            status=500,
            mimetype='application/json')


@app.route('api/v1/userform/addData', methods=['POST'])
def addData():
    if request.method.strip() == "POST":

        content = request.json
        dbResponse = db.data.insert_one(content)
        if dbResponse.acknowledged:
            print('****************************************************************')
            print("Data submitted successfully")
            print("Record id: " + dbResponse.inserted_id)
            print('****************************************************************')
            return Response(
                response=json.dumps(
                    {'message': 'Data inserted successfully', 'id': f"{dbResponse.inserted_id}", 'error': ""}),
                status=200,
                mimetype='application/json')
        else:
            print('****************************************************************')
            print("Error occurred")
            print(dbResponse)
            print('****************************************************************')
            return Response(
                response=json.dumps(
                    {'message': 'Data could not be inserted in database', 'error': "Data not added successfully"}),
                status=500,
                mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True)
