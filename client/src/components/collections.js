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
            console.log(data)
            let collectionsArr = []
            const collectionsData = data.collections
            for(let i = 0; i < collectionsData.length; i++){
                const collection = collectionsData[i]
                const title = collection.title
                const description = collection.description
                collectionsArr.push({title: title, text: description, image: data.images[i]})
            }

            setCollections(collectionsArr)
        })
        .catch((error) => {
            console.error(error)
        })
    },[])

    return(
        <div className={"collections"}>
            <h1>Collections</h1>
            <div className='CardWrapper'>
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection.title}
                        title={collection.title}
                        text={collection.text}
                        image={collection.image}
                    />
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
            />
        </div>
    )
}

export default Collections