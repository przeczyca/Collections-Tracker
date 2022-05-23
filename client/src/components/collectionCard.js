import React from 'react'
import { useNavigate } from 'react-router-dom'

import Card from 'react-bootstrap/Card'

import img1 from "./images/Collection_Image.jpg"

const CollectionCard = props => {

    const navigate = useNavigate()

    const openCollection = () => {
        navigate(`/collection/${props.title}`)
    }

    return(
        <div>
            <Card className='CardStyle' onClick={() => openCollection()}>
                <Card.Img className='CardImageContainer' src={img1} />
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