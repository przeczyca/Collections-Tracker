import os
from dotenv import load_dotenv
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import pymongo
import json
from bson.json_util import dumps
import gridfs

import codecs

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#MongoDB database
load_dotenv()
DATABASE = os.getenv("DATABASE")
client = pymongo.MongoClient(DATABASE)
db = client.collections_tracker
fs = gridfs.GridFS(db)

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
        #data = list(collections.find({}, {"items": 0}))
        data = list(collections.find({}, {"items": {'$slice': 1}}))
        imageIDs = []
        for collection in data:
            imageID = 0
            if len(collection['items']):
                imageID = collection['items'][0]['imageID']
            del collection['items']
            imageIDs.append(imageID)
        
        images = []
        for _id in imageIDs:
            image = 0
            if _id != 0:
                imageBytes = fs.get(_id).read()
                base64_data = codecs.encode(imageBytes, 'base64')
                image = base64_data.decode('utf-8')
            images.append(image)

        return Response(
            response=dumps(
                {"message": "retrieved collections", "collections": data, "images": images}
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

#Add new item to collection
@app.route("/api/add_item", methods = ['POST'])
def addItem():
    try:
        imageFile = request.files['file']
        
        data = {
            'collectionTitle': request.form['collectionTitle'],
            'itemName': request.form['itemName'],
            'itemDescription': request.form['itemDescription']
        }
        
        imageID = fs.put(imageFile)

        collections.update_one(
                                {"title": data["collectionTitle"]},
                                {"$push":
                                    {"items":
                                        {
                                            "itemName": data["itemName"],
                                            "itemDescription": data["itemDescription"],
                                            "imageID": imageID
                                        }
                                    }
                                })
        return Response(
            response=dumps(
                {
                    "message": "added item to collection",
                    "collectionTitle": data["collectionTitle"],
                    "itemName": data["itemName"]
                }
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
        images = []
        for item in items[0]['items']:
            imageBytes = fs.get(item['imageID']).read()
            base64_data = codecs.encode(imageBytes, 'base64')
            image = base64_data.decode('utf-8')
            images.append(image)
        
        return Response(
            response=dumps(
                {"message": "retrieved items", "collectionTitle": collectionTitle, "items": items[0]["items"], 'images': images}
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

#Delete item from collection
@app.route("/api/delete_item/<collectionTitle>/<itemName>", methods=["DELETE"])
def deleteItem(collectionTitle, itemName):
    try:
        imageIDQuery = collections.find({'title': collectionTitle}, {'items': {'$elemMatch':{'itemName': itemName}}})
        imageID = imageIDQuery[0]['items'][0]['imageID']
        
        dbResponse = collections.update_one({"title":collectionTitle}, {"$pull": {"items": {"itemName": itemName}}})
        fs.delete(imageID)

        return Response(
            response = dumps(
                {"message":"item deleted", "collectionTitle": collectionTitle, "title": itemName}
            ),
            status=200,
            mimetype="application/json"
        )

    except Exception as ex:
        print(ex)
        return Response(
            response = dumps(
                {"message":"cannot delete item"}
            ),
            status=500,
            mimetype="application.json"
        )

#Converts binary to json
def toJson(data):
    return json.loads(data)

if __name__ == "__main__":
    app.run(debug=True)