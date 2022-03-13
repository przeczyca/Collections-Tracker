import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
import json
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#MongoDB database
load_dotenv()
DATABASE = os.getenv("DATABASE")
client = pymongo.MongoClient(DATABASE) # defaults to port 27017
db = client.collections_tracker
users = db.users
collections = db.collections

#Create new collection in database with title and description
@app.route("/api/new_collection", methods = ['POST'])
def newCollection():
    data = toJson(request.get_data())
    collections.insert_one({ 'title': data['newTitle'], 'description': data['newText'], 'items': [] })
    return data

#Return JSON of all collections
@app.route("/api/get_collections", methods = ['GET'])
def getCollections():
    data = dumps(list(collections.find()))
    return data

#Add new item to collection
@app.route("/api/add_item", methods = ['POST'])
def addItem():
    data = toJson(request.get_data())

    return data

#Return JSON of all items in a collection
@app.route("/api/get_items", methods = ['GET'])
def getItems():
    return jsonify([{'title': "item1", 'text': "text1"}, {'title': "item2", 'text': "text2"}, {'title': "item3", 'text': "text3"}])

#Converts binary to json
def toJson(data):
    return json.loads(data)

if __name__ == "__main__":
    app.run(debug=True)