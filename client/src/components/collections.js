import React, {useState} from 'react'

import CollectionCard from './collectionCard'
import NewCollectionCard from './newCollectionCard'
import NewCollectionModal from './newCollectionModal'

import './componentStyles.css'



const Collections = () => {
    const [collections, setCollections] = useState([])
    const [modalShow, setModalShow] = useState(false)

    const createNewCollection = () => {
        console.log(collections)
        setModalShow(false)
    }

    return(
        <div className={"collections"}>
            <h1>Collections</h1>
            <div className='CardWrapper'>
                {collections.map((collection) => (
                    <CollectionCard key={collection.title} title={collection.title} text={collection.text}/>
                ))}

                <NewCollectionCard onClick={() => setModalShow(true)}/>
            </div>
            <NewCollectionModal show={modalShow} onHide={() => setModalShow(false)}
                collections={collections}
                setCollections={setCollections}
                createNewCollection={createNewCollection}
            />
        </div>
    )
}

export default Collections