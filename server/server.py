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
client = pymongo.MongoClient(DATABASE)
db = client.collections_tracker

collections = db.collections

#Create new collection in database with title and description
@app.route("/api/new_collection", methods = ['POST'])
def newCollection():
    try:
        data = toJson(request.get_data())
        dbResponse = collections.insert_one({ 'title': data['newTitle'], 'description': data['newText'], 'items': [] })
        return Response(
            response=dumps(
                {"message": "collection created", "title": data["newTitle"]}
            ),
            status=201,
            mimetype="application/json"
        )
    
    except Exception as ex:
        print(ex)
        return Response(
            response= dumps(
                {"message": "cannot create collection"}
            ),
            status=500,
            mimetype="application/json"
        )

#Return JSON of all collections
@app.route("/api/get_collections", methods = ['GET'])
def getCollections():
    try:
        data = list(collections.find({}, {"items": 0}))
        return Response(
            response=dumps(
                {"message": "retrieved collections", "collections": data}
            ),
            status=200,
            mimetype="application/json"
        )
    
    except Exception as ex:
        print(ex)
        return Response(
            response=dumps(
                {"message": "cannot get collections"}
            ),
            status=500,
            mimetype="application/json"
        )

#Delete entire collection
@app.route("/api/delete_collection/<collectionTitle>", methods = ['DELETE'])
def deleteCollection(collectionTitle):
    try:
        dbResponse = collections.delete_one({"title":collectionTitle})
        return Response(
            response = dumps(
                {"message":"collection deleted", "title": collectionTitle}
            ),
            status=200,
            mimetype="application/json"
        )

    except Exception as ex:
        print(ex)
        return Response(
            response = dumps(
                {"message":"cannot delete collection"}
            ),
            status=500,
            mimetype="application.json"
        )
    
    return data

#Add new item to collection
@app.route("/api/add_item", methods = ['PUT'])
def addItem():
    try:
        data = toJson(request.get_data())
        collections.update_one({"title": data["collectionTitle"]}, {"$push": {"items": {"itemName": data["itemName"], "itemDescription": data["itemDescription"]}}})
        return Response(
            response=dumps(
                {"message": "added item to collection", "collectionTitle": data["collectionTitle"], "itemName": data["itemName"]}
            ),
            status=201,
            mimetype="application/json"
        )
    
    except Exception as ex:
        print(ex)
        return Response(
            response=dumps(
                {"message": "cannot add item to collection"}
            ),
            status=500,
            mimetype="application/json"
        )

#Return JSON of all items in a collection
@app.route("/api/get_items", methods = ['GET'])
def getItems():
    try:
        collectionTitle = request.args.get("collectionTitle")
        items = collections.find({"title": collectionTitle}, {"items": 1, "_id": 0})
        return Response(
            response=dumps(
                {"message": "retrieved items", "collectionTitle": collectionTitle, "items": items[0]["items"]}
            )
        )
    
    except Exception as ex:
        print(ex)
        return Response(
            response=dumps(
                {"message": "cannot get items"}
            ),
            status=500,
            mimetype="application/json"
        )

#Converts binary to json
def toJson(data):
    return json.loads(data)

if __name__ == "__main__":
    app.run(debug=True)