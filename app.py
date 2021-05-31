import base64
import json
import os
from copy import deepcopy
from datetime import datetime, timedelta

import jwt
import pymongo
from Models import Models
from flask import Flask, Response, request
from flask_cors import CORS
from pymongo import ReadPreference
from werkzeug.security import generate_password_hash, check_password_hash

from HelperFuctions import get_avg_score

app = Flask(__name__)
cors = CORS(app)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY") or os.urandom(24)
app.config['DB_URL'] = os.environ.get("DB_URL") or "mongodb://localhost:27017"
scores = {}
print("Scores is: ", scores)
try:

    mongo = pymongo.MongoClient(app.config['DB_URL'], serverSelectionTimeoutMS=15000,
                                read_preference=ReadPreference.PRIMARY, connect=False)
    db = mongo["dyxsis"]
    mongo.server_info()  # trigger exception if cannot connect to database
    print("Connected to MongoDB server...")
    model = Models()
    model.load_all_models()
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
                            {'message': 'Login successful!', "error": "", 'token': token,
                             'pfp': dbResponse.get('pfp', "")}),
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
                        {'message': 'Login successful!', "error": "", 'token': token,
                         'pfp': dbResponse.get('pfp', "")}),
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
def add_nonuser_score():
    try:
        if request.method.strip() == "POST":
            print("Non User Scoressss")
            if request.json:
                global scores
                scores = deepcopy(request.json)
                print("Scores is: ", scores)
            content = request.json
            scoreArr = content.get('scores')
            if scoreArr is not None and len(scoreArr) > 0:
                content['timeStamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                dbResponse = db.nonUserScores.insert_one(content)
                if dbResponse.acknowledged:
                    print("Scores submitted successfully")
                    print("Record id: ", dbResponse.inserted_id)
                    return Response(
                        response=json.dumps(
                            {'message': 'Score inserted successfully', 'error': ""}),
                        status=200,
                        mimetype='application/json')
                else:
                    return Response(
                        response=json.dumps(
                            {'message': 'Data could not be inserted in database',
                             'error': "Data not added successfully"}),
                        status=500,
                        mimetype='application/json')
            else:
                return Response(
                    response=json.dumps(
                        {'message': 'No Score Data Found.', 'error': "No Score Data Found."}),
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


@app.route("/api/v1/userScores", methods=["POST"])
def add_user_score():
    try:
        if request.method.strip() == "POST":
            print("User Scoresssss")
            auth_token = request.headers.get("Authorization")
            if auth_token is not None:
                auth_token = auth_token.strip().split(" ")[-1]
                decoded_jwt = jwt.decode(auth_token, app.config["SECRET_KEY"], algorithms=["HS256"])
                username = decoded_jwt.get('username')
                if request.json:
                    global scores
                    scores = deepcopy(request.json)
                    print("Scores is: ", scores)
                content = request.json
                scoreArr = content.get('scores')
                if scoreArr is not None and len(scoreArr) > 0:
                    content['timeStamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    if username is not None:
                        existingUsername = db.users.find_one({'username': username})
                        if existingUsername is not None:
                            userScore = db.userScores.find_one({'username': username})
                            if userScore is not None:
                                lastLevel = content.get("level", '')
                                if lastLevel == "":
                                    lastLevel = userScore['lastPlayedLevel']
                                db.userScores.update_one({"_id": userScore['_id']},
                                                         {"$set": {"lastPlayedLevel": lastLevel}})
                                db.userScores.update_one({"_id": userScore['_id']},
                                                         {"$push": {"scores.{}".format(lastLevel): content}})
                                print("Scores submitted successfully")
                                return Response(
                                    response=json.dumps(
                                        {'message': 'Score inserted successfully', 'error': ""}),
                                    status=200,
                                    mimetype='application/json')
                            else:
                                lastLevel = content.get("level", '')
                                if lastLevel == "":
                                    lastLevel = 'preschooler'
                                userObj = {
                                    'username': username,
                                    'lastPlayedLevel': lastLevel,
                                    'scores': {
                                        'preschooler': [],
                                        'learner': [],
                                        'elementary': []
                                    }
                                }
                                userObj['scores'][lastLevel].append(content)
                                dbResponse = db.userScores.insert_one(userObj)
                                if dbResponse.acknowledged:
                                    print("Scores submitted successfully")
                                    print("Record id: ", dbResponse.inserted_id)
                                    return Response(
                                        response=json.dumps(
                                            {'message': 'Score inserted successfully',
                                             'id': f"{dbResponse.inserted_id}",
                                             'error': ""}),
                                        status=200,
                                        mimetype='application/json')
                                else:
                                    return Response(
                                        response=json.dumps(
                                            {'message': 'Data could not be inserted in database',
                                             'error': "Data not added successfully"}),
                                        status=500,
                                        mimetype='application/json')
                        else:
                            return Response(
                                response=json.dumps(
                                    {'message': 'User Record not found!',
                                     'error': "User Record not found!"}),
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
                            {'message': 'No Score Record Found.',
                             'error': "No Score Record Found."}),
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
                    if existingUsername is not None:
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


@app.route("/api/v1/getUserScore", methods=["GET"])
def getUserScore():
    try:
        if request.method == "GET":
            auth_token = request.headers.get("Authorization")
            if auth_token is not None:
                auth_token = auth_token.strip().split(" ")[-1]
                decoded_jwt = jwt.decode(auth_token, app.config["SECRET_KEY"], algorithms=["HS256"])
                username = decoded_jwt.get('username')
                if username is not None:
                    existingUsername = db.userScores.find_one({'username': username})
                    if existingUsername is not None:
                        lastLevel = existingUsername['lastPlayedLevel']
                        prevScore = existingUsername['scores'][lastLevel][-1]
                        return Response(
                            response=json.dumps(
                                {'message': 'User score successfully sent!', 'scores': prevScore, 'error': ""}),
                            status=200,
                            mimetype='application/json')
                    else:
                        return Response(
                            response=json.dumps(
                                {'message': 'No Previous Record Found', 'scores': {'scores': []}, 'error': ""}),
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
                {'message': 'Error while processing the request', "error": str(e)}),
            status=500,
            mimetype='application/json')


@app.route("/api/v1/getTrackHistory", methods=["GET"])
def getTrackHistory():
    try:
        if request.method == "GET":
            auth_token = request.headers.get("Authorization")
            auth_token = auth_token.strip().split(" ")[-1].strip() if auth_token is not None else ""
            if auth_token is not None and auth_token != "":
                decoded_jwt = jwt.decode(auth_token, app.config["SECRET_KEY"], algorithms=["HS256"])
                username = decoded_jwt.get('username')
                if username is not None:
                    existingHistory = db.history.find_one({'username': username})
                    if existingHistory is not None:
                        existingHistory.pop("_id")
                        print(existingHistory)
                        return Response(
                            response=json.dumps(
                                {'message': 'Track history successfully sent!', 'data': existingHistory, 'error': ""}),
                            status=200,
                            mimetype='application/json')
                    else:
                        return Response(
                            response=json.dumps(
                                {'message': 'No Previous Record Found', 'error': ""}),
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
                {'message': 'Error while processing the request', "error": str(e)}),
            status=500,
            mimetype='application/json')


@app.route("/api/v1/getPrediction", methods=["GET"])
def getPrediction():
    try:
        print("Scores is: ", scores)
        if request.method.strip() == "GET":
            if (len(scores.keys()) == 0) or ("scores" not in scores.keys()) or (len(scores['scores']) == 0):
                return Response(
                    response=json.dumps(
                        {'message': 'No Score Data Found!',
                         'error': "We're sorry but you will have to play the game again."}),
                    status=200,
                    mimetype='application/json')
            else:
                prediction = model.make_diagnosis(scores)
                print(prediction)
                return Response(
                    response=json.dumps(
                        {'message': 'Prediction sent successfully!', "error": "", "prediction": prediction,
                         "scores": scores['scores']}),
                    status=200,
                    mimetype='application/json')
        else:
            return Response(
                response=json.dumps(
                    {'message': 'Could not get prediction.',
                     "error": "Only GET requests allowed on this URI"}),
                status=500,
                mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps(
                {'message': 'Could not get prediction.', "error": str(e)}),
            status=500,
            mimetype='application/json')


@app.route("/api/v1/getUserPrediction", methods=["GET"])
def getUserPrediction():
    try:
        print("Scores is: ", scores)
        if request.method.strip() == "GET":
            if (len(scores.keys()) == 0) or ("scores" not in scores.keys()) or (len(scores['scores']) == 0):
                print("No Score Found...")
                return Response(
                    response=json.dumps(
                        {'message': 'No Score Data Found!',
                         'error': "We're sorry but you will have to play the game again."}),
                    status=200,
                    mimetype='application/json')
            else:
                auth_token = request.headers.get("Authorization")
                if auth_token is not None:
                    auth_token = auth_token.strip().split(" ")[-1]
                    decoded_jwt = jwt.decode(auth_token, app.config["SECRET_KEY"], algorithms=["HS256"])
                    username = decoded_jwt.get('username')
                    if username is not None:
                        prediction = model.make_diagnosis(scores)
                        date = datetime.today().strftime("%d-%m-%Y")
                        avg_score = get_avg_score(scores['scores'])
                        existingHistory = db.history.find_one({'username': username})
                        if existingHistory is not None:
                            db.history.update_one({"_id": existingHistory["_id"]},
                                                  {"$set": {"latestDiagnosis": prediction}})
                            db.history.update_one({"_id": existingHistory["_id"]},
                                                  {"$push": {"trackRecord.xAxis": date,
                                                             "trackRecord.yAxis": avg_score}})
                            print(prediction)
                            return Response(
                                response=json.dumps(
                                    {'message': 'Prediction sent successfully!', "error": "", "prediction": prediction,
                                     "scores": scores['scores']}),
                                status=200,
                                mimetype='application/json')
                        else:
                            db.history.insert_one({"username": username, "latestDiagnosis": prediction,
                                                   "trackRecord": {
                                                       "xAxis": [date],
                                                       "yAxis": [avg_score]
                                                   }})
                            print(prediction)
                            return Response(
                                response=json.dumps(
                                    {'message': 'Prediction sent successfully!', "error": "", "prediction": prediction,
                                     "scores": scores['scores']}),
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
                    {'message': 'Could not get prediction.',
                     "error": "Only GET requests allowed on this URI"}),
                status=500,
                mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps(
                {'message': 'Could not get prediction.', "error": str(e)}),
            status=500,
            mimetype='application/json')


@app.route("/api/v1/addFeedback", methods=['POST'])
def add_feedback():
    try:
        if request.method.strip() == "POST":
            auth_token = request.headers.get("Authorization")
            data = request.json
            if auth_token is None:
                print("No auth token")
                if data:
                    db.feedbacks.insert_one(data)
                return Response(
                    response=json.dumps(
                        {'message': 'Feedback stored successfully!',
                         "error": ""}),
                    status=200,
                    mimetype='application/json')
            else:
                auth_token = auth_token.strip().split(" ")[-1]
                decoded_jwt = jwt.decode(auth_token, app.config["SECRET_KEY"], algorithms=["HS256"])
                username = decoded_jwt.get('username')
                if data:
                    if username is not None:
                        data['username'] = username

                    db.feedbacks.insert_one(data)
                return Response(
                    response=json.dumps(
                        {'message': 'Feedback stored successfully!',
                         "error": ""}),
                    status=200,
                    mimetype='application/json')
        else:
            return Response(
                response=json.dumps(
                    {'message': 'Could not get prediction.',
                     "error": "Only POST requests allowed on this URI"}),
                status=500,
                mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps(
                {'message': 'Could not get prediction.', "error": str(e)}),
            status=500,
            mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
