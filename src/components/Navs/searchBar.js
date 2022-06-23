import React from "react";
import { useState, useEffect, useContext } from "react";
import {Nav, Navbar, NavDropdown, Offcanvas, Form, FormControl, Button, Container, Row} from 'react-bootstrap/'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {faB, faC, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoIcon from '../../static/logo.png'
import AuthSession from "../../Utils/AuthSession";
import {Link} from "react-router-dom";
const GlobalNav = () => {
    const {auth} = useContext(AuthSession);
    console.log(auth)
    return(
        <div >
            <Navbar  bg="light" expand='md' className="mb-3">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img src={logoIcon} style={{width:"100px", heigh:"70px"}}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                        Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link>
                                {!auth.email ? <Link to="/login">Login/Register</Link> : <Link to="/profile">{auth.name}</Link>  }
                            </Nav.Link>
                            
                            <NavDropdown
                                title="Dropdown"
                                id={`offcanvasNavbarDropdown-expand-md`}
                            >
                                <NavDropdown.Item href="#action3">Your products</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                Testing products
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    )
}
export default GlobalNav;