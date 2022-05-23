import React from 'react'

import Card from 'react-bootstrap/Card'

import img1 from "./images/add_new.png"

const NewCard = props => {
    return (
        <div className='CardStyle'>
            <Card onClick={props.onClick}>
                <Card.Img className='CardImageContainer' src = {img1} />
                <Card.Body>
                    <Card.Title>New {props.cardType}</Card.Title>
                    <Card.Text>
                        Create a new {props.cardType}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NewCard