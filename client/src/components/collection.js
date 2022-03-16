import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import ItemCard from "./itemCard"
import NewCard from "./newCard"
import NewItemModal from "./newItemModal"

const Collection = () => {
    const [collection, setCollection] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const {collectionTitle} = useParams()

    useEffect (() => {
        fetch(`http://127.0.0.1:5000/api/get_items?collectionTitle=${collectionTitle}`, {method: 'GET'}).then(
            response => response.json())
        .then((data) => {
          let collectionArr = []
          for(let i = 0; i < data[0].items.length; i++){
            const item = data[0].items[i]
            const name = item.itemName
            const description = item.itemDescription
            collectionArr.push({itemName: name, itemDescription: description})
          }

          setCollection(collectionArr)
          
        })
        .catch((error) => {
          console.error(error)
        })
    },[collectionTitle])

    const itemModalShowFalse = () => {
        setModalShow(false)
    }

    return (
        <div className="collections">
            <h1>{collectionTitle} Collection</h1>
            <div className='CardWrapper'>
                {collection.map((item) => (
                    <ItemCard key={item.itemName} title={item.itemName} text={item.itemDescription}/>
                ))}

                <NewCard
                    onClick={() => setModalShow(true)}
                    cardType={"Item"}
                />
            </div>
            <NewItemModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                collectionTitle={collectionTitle}
                collection={collection}
                setCollection={setCollection}
                itemModalShowFalse={itemModalShowFalse}
            />
        </div>
    )
}

export default Collection