import React from 'react'

import Card from 'react-bootstrap/Card'

import img1 from "./images/pew wall.jpg"

const CollectionCard = props => {
    return(
        <div>
            <Card className='CardStyle'>
                <Card.Img src={img1} />
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