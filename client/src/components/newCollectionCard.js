import React from 'react'

import Card from 'react-bootstrap/Card'

import img1 from "./images/add_new.png"

const NewCollectionCard = props => {
    return (
        <div className='CardStyle'>
            <Card onClick={props.onClick}>
                <Card.Img src = {img1} />
                <Card.Body>
                    <Card.Title>New Collection</Card.Title>
                    <Card.Text>
                        Create a new Collection
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NewCollectionCard