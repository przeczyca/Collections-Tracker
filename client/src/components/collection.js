import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import ItemCard from "./itemCard"
import NewCard from "./newCard"
import ItemModal from "./itemModal"
import NewItemModal from "./newItemModal"

const Collection = () => {
    const [collection, setCollection] = useState([])
    const [selectedItem, setSelectedItem] = useState("asdf")
    const [itemModalShow, setItemModalShow] = useState(false)
    const [newItemModalShow, setNewItemModalShow] = useState(false)
    const {collectionTitle} = useParams()

    useEffect (() => {
        fetch(`http://127.0.0.1:5000/api/get_items?collectionTitle=${collectionTitle}`, {method: 'GET'}).then(
            response => response.json())
        .then((data) => {
          let collectionArr = []
          for(let i = 0; i < data.items.length; i++){
            const item = data.items[i]
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

    return (
        <div className="collections">
            <h1>{collectionTitle} Collection</h1>
            <div className='CardWrapper'>
                {collection.map((item) => (
                    <ItemCard
                        setItemModalShow={() => setItemModalShow(true)}
                        setSelectedItem={() => setSelectedItem(item.itemName)}
                        key={item.itemName}
                        title={item.itemName}
                        text={item.itemDescription}
                    />
                ))}

                <NewCard
                    onClick={() => setNewItemModalShow(true)}
                    cardType={"Item"}
                />
            </div>

            <ItemModal
                show={itemModalShow}
                onHide={() => setItemModalShow(false)}
                itemName={selectedItem}
            />

            <NewItemModal
                show={newItemModalShow}
                onHide={() => setNewItemModalShow(false)}
                collectionTitle={collectionTitle}
                collection={collection}
                setCollection={setCollection}
            />
        </div>
    )
}

export default Collection