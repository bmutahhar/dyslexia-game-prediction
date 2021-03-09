import json
import os
from datetime import datetime, timedelta

import jwt
import pymongo
from flask import Flask, Response, request
from flask_cors import CORS
from pymongo import ReadPreference
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
cors = CORS(app)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY") or os.urandom(24)
app.config['DB_URL'] = os.environ.get("DB_URL") or "mongodb://localhost:27017"
try:

    mongo = pymongo.MongoClient(app.config['DB_URL'], serverSelectionTimeoutMS=15000,
                                read_preference=ReadPreference.PRIMARY,connect=False)
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
            password = content['password'] if content['password'].strip() != "" and content[
                'password'] is not None else os.urandom(24)
            passwordHash = generate_password_hash(password)
            content['password'] = passwordHash
            token = jwt.encode({'username': username, 'expire': str(datetime.utcnow() + timedelta(minutes=60))},
                               app.config['SECRET_KEY'])
            existingUsername = db.users.find_one({'username': username})
            if existingUsername is None:
                existingEmail = db.users.find_one({'email': email})
                if existingEmail is None:
                    dbResponse = db.users.insert_one(content)
                    print("Record inserted successfully!")
                    return Response(
                        response=json.dumps(
                            {'message': 'Record inserted successfully', 'id': f"{dbResponse.inserted_id}",
                             'error': "", "token": token}),
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
        return Response(
            response=json.dumps(
                {'message': 'Data could not be inserted in database',
                 "error": str(e)}),
            status=500,
            mimetype='application/json')


@app.route('/api/v1/user/login', methods=['POST'])
def login():
    try:
        if request.method.strip() == "POST":
            content = json.loads(request.json)
            username = content['username'].strip()
            password = content['password'].strip()
            token = jwt.encode({'username': username, 'expire': str(datetime.utcnow() + timedelta(minutes=60))},
                               app.config['SECRET_KEY'])
            dbResponse = db.users.find_one({'$or': [{'username': username}, {'email': username}]}, {
                'username': 1, 'password': 1})
            if dbResponse is not None:
                if check_password_hash(dbResponse['password'].strip(), password):
                    return Response(
                        response=json.dumps(
                            {'message': 'Login successful!', "error": "", 'token': token}),
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
                         "error": "Username or email doesn't exist. Have you signed up yet?"}),
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


@app.route("/api/v1/user/login-google", methods=["POST"])
def googleLogin():
    try:
        if request.method.strip() == "POST":
            content = json.loads(request.json)
            username = content['username'].strip()
            email = content['email'].strip()
            loginType = content['googleLogin']
            token = jwt.encode({'username': username, 'expire': str(datetime.utcnow() + timedelta(minutes=60))},
                               app.config['SECRET_KEY'])
            dbResponse = db.users.find_one({'email': email})
            if dbResponse is not None and loginType:
                return Response(
                    response=json.dumps(
                        {'message': 'Login successful!', "error": "", 'token': token}),
                    status=200,
                    mimetype='application/json')
            elif not loginType:
                return Response(
                    response=json.dumps(
                        {'message': 'Login unsuccessful!', "error": "Not Originated from Google Login"}),
                    status=500,
                    mimetype='application/json')
            elif dbResponse is None:
                print("1234")
                return Response(
                    response=json.dumps(
                        {'message': 'Credentials not found',
                         "error": "Username or email doesn't exist. Have you signed up yet?"}),
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


@app.route("/api/v1/questions/<difficulty>", methods=['GET'])
def get_questions(difficulty):
    try:
        if request.method == 'GET':
            data = db.questions.find_one({'level': difficulty.strip().lower()})
            # raise Exception
            return Response(
                response=json.dumps(data['data']),
                status=200,
                mimetype='application/json')
        else:
            return Response(
                response=json.dumps(
                    {'message': 'Could not fetch data from the database',
                     "error": "Only GET requests allowed on this URI"}),
                status=500,
                mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps(
                {'message': 'Could not fetch data from the database', "error": str(e)}),
            status=500,
            mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True,threaded=True)
