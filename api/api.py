import time
from flask import Flask
from flask_pymongo import PyMongo
from pymongo import ReturnDocument

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/counter"
mongo = PyMongo(app)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/count', methods=['GET'])
def get_count():
    count = mongo.db.count.find_one({'_id': 1})['count']
    return {'count': count}


@app.route('/count', methods=['POST'])
def increase_count():
    result = mongo.db.count.find_one_and_update(
        {
            '_id': 1
        },
        {
            '$inc': {'count': 1}
        },
        return_document=ReturnDocument.AFTER,
    )
    return {'count': result['count']}
