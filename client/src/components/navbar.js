import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const CollectionNavbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const currentLoaction = location.pathname;
    const path = currentLoaction.split("/")
    const [dropdownVisible, setDropdownVisible] = useState(path[1] === "collection")

    useEffect(() => {
        setDropdownVisible(path[1] === "collection")
    }, [path]);

    const deleteCollection = () => {
        //Make sure it is the "collection" page
        if(path[1] === "collection"){
            fetch(`http://127.0.0.1:5000/api/delete_collection/${path[2]}`, {method: 'DELETE'}).then(
                response => response.json())
            .then((data) => {
            console.log(data)
            navigate('/')
            })
            .catch((error) => {
            console.error(error)
            })
        }
    }

    return(
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">Collection Tracker</Navbar.Brand>
                <Nav className="me-auto">
                    {//Dropdown only visible when on collection page
                    dropdownVisible &&
                        <DropdownButton variant="secondary" title="Options">
                            <Dropdown.Item onClick={() => deleteCollection()}>Delete Collection</Dropdown.Item>
                        </DropdownButton>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default CollectionNavbar