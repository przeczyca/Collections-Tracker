import React from "react"
import { useLocation } from "react-router-dom"

import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const ItemModal = (props) => {
    const location = useLocation()
    const currentLocation = location.pathname;
    const path = currentLocation.split("/")

    const deleteItem = () => {
        if (path[1] === "collection"){
            fetch(`http://127.0.0.1:5000/api/delete_item/${path[2]}/${props.itemName}`, {method: 'DELETE'}).then(
                response => response.json())
            .then((data) => {
                props.setCollection(props.collection.filter(item => item.itemName !== props.itemName))
                props.onHide()
            })
            .catch((error) => {
            console.error(error)
            })
        }
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.itemName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={deleteItem}>Delete Item</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ItemModal