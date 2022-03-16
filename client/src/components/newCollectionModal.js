import React, {useState} from "react";

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const NewCollectionModal = (props) => {
    const [newTitle, setTitle] = useState("")
    const [newText, setText] = useState("")

    const createNewCollection = () => {
        if (newTitle !== ""){
            props.setCollections([...props.collections, {title: newTitle, text: newText}])
            props.collectionModalShowFalse()

            const toSend = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ newTitle, newText })
            }
            fetch('http://127.0.0.1:5000/api/new_collection', toSend)
            .catch((error) => {
              console.error(error)
            })
        }
        setTitle("")
        setText("")
    }

    return (
        <Modal
          show={props.show} onHide={props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create New Collection
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3">
                <h4>Title</h4>
                <Form.Control
                    placeholder = "Title"
                    onChange={(e) => {setTitle(e.target.value)}}
                />
            </Form.Group>

            <Form.Group>
                <h4>Description</h4>
                <Form.Control
                    as="textarea" rows={3}
                    placeholder = "Description"
                    onChange={(e) => {setText(e.target.value)}}
                />
            </Form.Group>
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={props.onHide}>Cancel</Button>
            <Button onClick={createNewCollection}>Add New Collection</Button>
          </Modal.Footer>
        </Modal>
    )
}

export default NewCollectionModal