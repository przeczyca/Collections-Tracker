import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import ItemCard from "./itemCard"
import NewCollectionCard from "./newCollectionCard"

const Collection = () => {
    const [collection, setCollection] = useState([])
    const {collectionTitle} = useParams()

    //const collection = [{title: "item1", text: "text1"}, {title: "item2", text: "text2"}, {title: "item3", text: "text3"}]

    useEffect (() => {
        fetch('http://127.0.0.1:5000/api/get_items', {method: 'GET'}).then(
            response => response.json())
        .then((data) => {
          console.log(data)
          let collectionArr = []
          for(let i = 0; i < data.length; i++){
            const item = data[i]
            const title = item.title
            const description = item.description
            collectionArr.push({title: title, text: description})
          }

          setCollection(collectionArr)
          
        })
        .catch((error) => {
          console.error(error)
        })
    },[])

    //setCollection([{title: "item1", text: "text1"}, {title: "item2", text: "text2"}, {title: "item3", text: "text3"}])
    return (
        <div className="collections">
            <h1>{collectionTitle} Collection</h1>
            <div className='CardWrapper'>
                {collection.map((item) => (
                    <ItemCard key={item.title} title={item.title} text={item.text}/>
                ))}

                <NewCollectionCard />
            </div>
        </div>
    )
}

export default Collection