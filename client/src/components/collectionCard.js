import React from 'react'
import { useNavigate } from 'react-router-dom'

import Card from 'react-bootstrap/Card'

import emptyImage from "./images/Empty.png"

const CollectionCard = props => {

    const navigate = useNavigate()

    const openCollection = () => {
        navigate(`/collection/${props.title}`)
    }
    const collectionImage = typeof(props.image) === "string" ? `data:image/jpg;base64,${props.image}` : emptyImage

    return(
        <div>
            <Card className='CardStyle' onClick={() => openCollection()}>
                <Card.Img className='CardImageContainer' src={collectionImage} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CollectionCard