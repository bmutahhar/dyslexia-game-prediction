import base64
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
                                read_preference=ReadPreference.PRIMARY, connect=False)
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
            token = jwt.encode({'username': username, 'expire': str(datetime.utcnow() + timedelta(minutes=80))},
                               app.config['SECRET_KEY'], algorithm="HS256")
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
            token = jwt.encode({'username': username, 'expire': str(datetime.utcnow() + timedelta(minutes=80))},
                               app.config['SECRET_KEY'], algorithm="HS256")
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
            token = jwt.encode({'username': username, 'expire': str(datetime.utcnow() + timedelta(minutes=80))},
                               app.config['SECRET_KEY'], algorithm="HS256")
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


@app.route("/api/v1/nonUserScores", methods=["POST"])
def add_final_score():
    try:
        if request.method.strip() == "POST":
            content = {"timeStamp": datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"), 'score': request.json}
            dbResponse = db.nonUserScores.insert_one(content)
            if dbResponse.acknowledged:
                print("Scores submitted successfully")
                print("Record id: ", dbResponse.inserted_id)
                return Response(
                    response=json.dumps(
                        {'message': 'Score inserted successfully', 'id': f"{dbResponse.inserted_id}", 'error': ""}),
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


# @app.route("/api/v1/uploadPfp", methods=["POST"])
# def update_pfp():
#     try:
#         if request.method == "POST":
#             auth_token = request.headers.get("Authorization")
#             if auth_token is not None:
#                 if "file" in request.files:
#                     file = request.files['file']
#                     ext = file.filename.split(".")[-1].lower()
#                     print("Filename: {}\nExt: {}".format(file.filename, ext))
#                     auth_token = auth_token.strip().split(" ")[-1]
#                     decoded_jwt = jwt.decode(auth_token, app.config["SECRET_KEY"], algorithms=["HS256"])
#                     img = base64.b64encode(file.read())
#                     pfpEncoded = "data:image/{};base64,{}".format(ext, img.decode())
#                     print(pfpEncoded[:50])
#                     username = decoded_jwt.get('username')
#                     if username is not None:
#                         existingUsername = db.users.find_one({'username': username})
#                         if existingUsername:
#                             db.users.update_one({"_id": existingUsername["_id"]}, {"$set": {"pfp": pfpEncoded}})
#                             return Response(
#                                 response=json.dumps(
#                                     {'message': 'Image received successfully',
#                                      'error': ""}),
#                                 status=200,
#                                 mimetype='application/json')
#                         else:
#                             return Response(
#                                 response=json.dumps(
#                                     {'message': 'User not found!',
#                                      'error': "User not found!"}),
#                                 status=500,
#                                 mimetype='application/json')
#
#
#                     else:
#                         return Response(
#                             response=json.dumps(
#                                 {'message': 'User not found!',
#                                  'error': "User not found!"}),
#                             status=500,
#                             mimetype='application/json')
#                 else:
#                     return Response(
#                         response=json.dumps(
#                             {'message': 'No file received!',
#                              'error': "No file received!"}),
#                         status=500,
#                         mimetype='application/json')
#             else:
#                 return Response(
#                     response=json.dumps(
#                         {'message': 'Only authorized users are allowed on this end point.',
#                          'error': "Only authorized users are allowed on this end point."}),
#                     status=500,
#                     mimetype='application/json')
#     except Exception as e:
#         print(e)
#         return Response(
#             response=json.dumps(
#                 {'message': 'Profile pic could not be saved', "error": str(e)}),
#             status=500,
#             mimetype='application/json')


@app.route("/api/v1/getUserData", methods=["GET"])
def getUserData():
    try:
        if request.method == "GET":
            auth_token = request.headers.get("Authorization")
            if auth_token is not None:
                auth_token = auth_token.strip().split(" ")[-1]
                decoded_jwt = jwt.decode(auth_token, app.config["SECRET_KEY"], algorithms=["HS256"])
                username = decoded_jwt.get('username')
                if username is not None:
                    existingUsername = db.users.find_one({'username': username})
                    existingUsername.pop('_id')
                    return Response(
                        response=json.dumps(
                            {'message': 'Data sent successfully!',
                             'error': "", "data": existingUsername}),
                        status=200,
                        mimetype='application/json')
                else:
                    return Response(
                        response=json.dumps(
                            {'message': 'User not found!',
                             'error': "User not found!"}),
                        status=500,
                        mimetype='application/json')
            else:
                return Response(
                    response=json.dumps(
                        {'message': 'Only authorized users are allowed on this end point.',
                         'error': "Only authorized users are allowed on this end point."}),
                    status=500,
                    mimetype='application/json')
        else:
            return Response(
                response=json.dumps(
                    {'message': 'Only authorized GET requests are allowed on this end point.',
                     'error': "Only authorized GET requests are allowed on this end point."}),
                status=500,
                mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps(
                {'message': 'Profile pic could not be saved', "error": str(e)}),
            status=500,
            mimetype='application/json')


@app.route("/api/v1/updateProfileData", methods=["POST"])
def updateProfileData():
    try:
        if request.method == "POST":
            auth_token = request.headers.get("Authorization")
            print(request.form)
            print(request.files)
            if auth_token is not None:
                auth_token = auth_token.strip().split(" ")[-1]
                decoded_jwt = jwt.decode(auth_token, app.config["SECRET_KEY"], algorithms=["HS256"])
                file = request.files.get("file")
                fileType = request.form.get('fileType')
                pfpEncoded = ""
                data = request.form.get("data")
                if file and fileType:
                    fileType = request.form['fileType'].replace("jpeg", "jpg")
                    print("Filename: {}\nType: {}".format(file.filename, fileType))
                    img = base64.b64encode(file.read())
                    pfpEncoded = "data:{};base64,{}".format(fileType, img.decode())
                if data:
                    data = json.loads(data)
                    username = decoded_jwt.get('username')
                    if username is not None:
                        existingUsername = db.users.find_one({'username': username})
                        if existingUsername:
                            db.users.update_one({"_id": existingUsername["_id"]},
                                                {"$set": {"username": data.get('username', ""),
                                                          "parentName": data.get("parentName", ""),
                                                          "childName": data.get("childName", ""),
                                                          "childAge": data.get("age", ""),
                                                          "gender": data.get("gender", ""),
                                                          "email": data.get("email", ""),
                                                          "phone": data.get("phone", ""),
                                                          "country": data.get("country", ""),
                                                          "city": data.get("city", ""),
                                                          "pfp": pfpEncoded}})
                            return Response(
                                response=json.dumps(
                                    {'message': 'Data updated successfully!',
                                     'error': ""}),
                                status=200,
                                mimetype='application/json')
                        else:
                            return Response(
                                response=json.dumps(
                                    {'message': 'User not found!',
                                     'error': "User not found!"}),
                                status=500,
                                mimetype='application/json')
                    else:
                        return Response(
                            response=json.dumps(
                                {'message': 'User not found!',
                                 'error': "User not found!"}),
                            status=500,
                            mimetype='application/json')
            else:
                return Response(
                    response=json.dumps(
                        {'message': 'Only authorized users are allowed on this end point.',
                         'error': "Only authorized users are allowed on this end point."}),
                    status=500,
                    mimetype='application/json')

        else:
            return Response(
                response=json.dumps(
                    {'message': 'Only authorized POST requests are allowed on this end point.',
                     'error': "Only authorized POST requests are allowed on this end point."}),
                status=500,
                mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps(
                {'message': 'Error while processing the request', "error": str(e)}),
            status=500,
            mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
