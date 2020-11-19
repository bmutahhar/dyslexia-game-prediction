from flask import Flask

app = Flask(__name__)


@app.route('/api/v1/home', methods=['GET'])
def index():
    return {'API': "Flask API Loaded Successfully!"}


if __name__ == '__main__':
    app.run(debug=True)
