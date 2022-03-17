import React from "react"

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const CollectionNavbar = () => {

    return(
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
            <DropdownButton variant="secondary" title="Options">
                <Dropdown.Item onClick={()=>console.log("asdf")}>Action</Dropdown.Item>
            </DropdownButton>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default CollectionNavbar