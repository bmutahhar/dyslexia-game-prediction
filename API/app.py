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


@app.route('/api/home', methods=["GET"])
def home():
    return json.dumps({"API": "Request received successfully!"})
    # return "<h2>Api working</h2>"


# @app.route('/api/v1/user/login', methods=['POST'])
# def index():
#     try:
#         print('****************************************************************')
#         if (request.is_json):
#             print(json.loads(request.json)['username'])
#             dbResponse = db.users.insert_one(json.loads(request.json))
#             print(json.loads(request.json)['password'])
#             print("Record inserted successfully!")
#             print('****************************************************************')
#             return Response(
#                 response=json.dumps(
#                     {'message': 'data received successfully', 'id': f"{dbResponse.inserted_id}"}),
#                 status=200,
#                 mimetype='application/json')
#         else:
#             return Response(
#                 response=json.dumps(
#                     {'message': 'Data could not be inserted in database'}),
#                 status=500,
#                 mimetype='application/json')

#     except Exception as e:
#         print(e)

@app.route('/api/v1/user/login', methods=['POST'])
def login():
    try:
        print('****************************************************************')
        if (request.method.strip() == "POST"):
            content = json.loads(request.json)
            username = content['username'].strip()
            password = content['password'].strip()
            print(username)
            dbResponse = db.users.find_one({'username': username})
            if dbResponse is not None:
                print(password)
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
                            {'message': 'Password incorrect', "error": "Username or password incorrect"}),
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
                    {'message': 'Data could not be inserted in database', "error": "Internal DB Error"}),
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
