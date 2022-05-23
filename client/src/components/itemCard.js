import React from 'react'
//import { useNavigate } from 'react-router-dom'

import Card from 'react-bootstrap/Card'

const ItemCard = props => {

    const showItem = () => {
        props.setItemModalShow()
        props.setSelectedItem()
    }
    const itemImage = typeof(props.image) === "string" ? `data:image/jpg;base64,${props.image}` : URL.createObjectURL(props.image)

    return(
        <div>
            <Card className='CardStyle' onClick={() => showItem()}>
                <Card.Img className='CardImageContainer' src={itemImage} />
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

export default ItemCard