import React, {useState} from "react";

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const NewItemModal = (props) => {
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [itemNameErrorMessage, setItemNameErrorMessage] = useState("")
    const [images, setImages] = useState([])

    //titleErrorMessage doesn't go back to "" when modal is closed after error
    const containsNewItemName = () => {
      return props.collection.some(item => item.itemName === itemName)
    }

    const createNewItem = () =>{
      if (itemName === ""){
        setItemNameErrorMessage("Item name cannot be blank")
      }
      else if (containsNewItemName()){
        setItemNameErrorMessage("Item already exists")
      }
      else {
          const collectionTitle = props.collectionTitle
          const image = new FormData()
          image.append("file", images[0])
          image.append('collectionTitle', collectionTitle)
          image.append('itemName', itemName)
          image.append('itemDescription', itemDescription)

          console.log(images[0])
          const toSend = {
            method: 'POST',
            //headers: { 'Content-Type': 'multipart/form-data' },
            body:  image,
          }
          console.log(toSend)
          fetch('http://127.0.0.1:5000/api/add_item', toSend)
            .catch((error) => {
            console.error(error)
            })

          props.setCollection([...props.collection, {itemName: itemName, itemDescription: itemDescription}])
          props.onHide()
      }
      setItemName("")
      setItemDescription("")
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
              Create New Item
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3">
                <h4>Item Name</h4>
                <Form.Control
                    placeholder = "Item Name"
                    onChange={(e) => {setItemName(e.target.value)}}
                />
                <div className="ErrorMessage">{itemNameErrorMessage}</div>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <h4>Add Images</h4>
              <Form.Control
                type="file"
                name="file"
                multiple
                onChange={(e) => {setImages(e.target.files)}}
              />
            </Form.Group>
            <Form.Group>
                <h4>Description</h4>
                <Form.Control
                    as="textarea" rows={3}
                    placeholder = "Description"
                    onChange={(e) => {setItemDescription(e.target.value)}}
                />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={props.onHide}>Cancel</Button>
            <Button onClick={createNewItem}>Add New Item</Button>
          </Modal.Footer>
        </Modal>
    )
}

export default NewItemModal