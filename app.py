import json
import os
from datetime import datetime

import pymongo
from flask import Flask, Response, request
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY") if os.environ.get("SECRET_KEY") is not None else "FLASKAPI!@#"
try:

    mongo = pymongo.MongoClient(
        "mongodb+srv://root:root@dyxsisml.anbn7.mongodb.net/playground?retryWrites=true&w=majority",
        serverSelectionTimeoutMS=1000)
    db = mongo["dyxsis"]

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
            passwordHash = generate_password_hash(content['password'])
            content['password'] = passwordHash
            existingUsername = db.users.find_one({'username': username})
            if existingUsername is None:
                existingEmail = db.users.find_one({'email': email})
                if existingEmail is None:
                    dbResponse = db.users.insert_one(content)
                    print("Record inserted successfully!")
                    return Response(
                        response=json.dumps(
                            {'message': 'Record inserted successfully', 'id': f"{dbResponse.inserted_id}",
                             'error': ""}),
                        status=200,
                        mimetype='application/json')
                else:
                    print("This email already exists")
                    return Response(
                        response=json.dumps(
                            {'message': 'Data could not be inserted in database',
                             "error": "This email is already used by another user"}),
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
                    {'message': 'Data could not be inserted in database',
                     "error": "Only POST requests allowed on this URI"}),
                status=500,
                mimetype='application/json')

    except Exception as e:
        print(e)


@app.route('/api/v1/user/login', methods=['POST'])
def login():
    try:
        if request.method.strip() == "POST":
            content = json.loads(request.json)
            username = content['username'].strip()
            password = content['password'].strip()
            print(username)
            dbResponse = db.users.find_one({'$or': [{'username': username}, {'email': username}]}, {
                'username': 1, 'password': 1})
            if dbResponse is not None:
                if check_password_hash(dbResponse['password'].strip(), password):
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
                        {'message': 'Credentials not found',
                         "error": "Username doesn't exist. Have you signed up yet?"}),
                    status=500,
                    mimetype='application/json')

        else:
            return Response(
                response=json.dumps(
                    {'message': 'Login Credentials could not be verified. Only POST requests allowed on this URI',
                     "error": "Only POST requests allowed on this URI"}),
                status=500,
                mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps(
                {'message': 'Data could not be inserted in database', "error": str(e)}),
            status=500,
            mimetype='application/json')


@app.route('/api/v1/userform/addData', methods=['POST'])
def addData():
    try:
        if request.method.strip() == "POST":
            content = {"datetime": datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"), 'data': request.json}
            dbResponse = db.initialFormData.insert_one(content)
            if dbResponse.acknowledged:
                print("Data submitted successfully")
                print("Record id: ", dbResponse.inserted_id)
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
        else:
            return Response(
                response=json.dumps(
                    {'message': 'Data could not be inserted in database',
                     "error": "Only POST requests allowed on this URI"}),
                status=500,
                mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps(
                {'message': 'Data could not be inserted in database', "error": str(e)}),
            status=500,
            mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True)
