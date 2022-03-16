import React, {useState, useEffect} from 'react'

import CollectionCard from './collectionCard'
import NewCard from './newCard'
import NewCollectionModal from './newCollectionModal'

import './componentStyles.css'

const Collections = () => {
    const [collections, setCollections] = useState([])
    const [modalShow, setModalShow] = useState(false)

    //Get collections from database
    useEffect (() => {
        fetch('http://127.0.0.1:5000/api/get_collections', {method: 'GET'}).then(
            response => response.json())
        .then((data) => {
          let collectionsArr = []
          for(let i = 0; i < data.length; i++){
            const collection = data[i]
            const title = collection.title
            const description = collection.description
            collectionsArr.push({title: title, text: description})
          }

          setCollections(collectionsArr)
        })
        .catch((error) => {
          console.error(error)
        })
    },[])

    const collectionModalShowFalse = () => {
        setModalShow(false)
    }

    return(
        <div className={"collections"}>
            <h1>Collections</h1>
            <div className='CardWrapper'>
                {collections.map((collection) => (
                    <CollectionCard key={collection.title} title={collection.title} text={collection.text}/>
                ))}

                <NewCard
                    onClick={() => setModalShow(true)}
                    cardType={"Collection"}
                />
            </div>
            <NewCollectionModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                collections={collections}
                setCollections={setCollections}
                collectionModalShowFalse={collectionModalShowFalse}
            />
        </div>
    )
}

export default Collections