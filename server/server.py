import os
from dotenv import load_dotenv
from flask import Flask, Response, request, jsonify
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

#Delete entire collection
@app.route("/api/delete_collection/<collectionTitle>", methods = ['DELETE'])
def deleteCollection(collectionTitle):
    try:
        dbResponse = collections.delete_one({"title":collectionTitle})
        return Response(
            response = json.dumps(
                {"message":"collection deleted", "title": collectionTitle}
            ),
            status=200,
            mimetype="application/json"
        )

    except Exception as ex:
        print(ex)
        return Response(
            response = json.dumps(
                {"message":"cannot delete collection"}
            ),
            status=500,
            mimetype="application.json"
        )
    
    return data

#Add new item to collection
@app.route("/api/add_item", methods = ['PUT'])
def addItem():
    data = toJson(request.get_data())
    collections.update_one({"title": data["collectionTitle"]}, {"$push": {"items": {"itemName": data["itemName"], "itemDescription": data["itemDescription"]}}})
    return data

#Return JSON of all items in a collection
@app.route("/api/get_items", methods = ['GET'])
def getItems():
    collectionTitle = request.args.get("collectionTitle")
    data = dumps(collections.find({"title": collectionTitle}, {"items": 1, "_id": 0}))
    return data

#Converts binary to json
def toJson(data):
    return json.loads(data)

if __name__ == "__main__":
    app.run(debug=True)