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
    const {auth, setAuth} = useContext(AuthSession);
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
                            <Form className="d-flex"  >
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    style={{height:"35px"}}
                                />
                                <Button variant="outline-success" style={{height:"35px"}}>Search</Button>
                            </Form>                           
                            <Nav.Link style={{fontWeight:"bold"}}>
                                {!auth.email ? <Link to="/login"  style={{textDecoration: "none"}}>Login/Register</Link> : <Link to="/profile"  style={{textDecoration: "none"}}>{auth.name}</Link>  }
                            </Nav.Link>
                            <Nav.Link style={{fontWeight:"bold"}}>
                                {!auth.email ? <Link to="/" style={{textDecoration: "none"}}>Home</Link> : <Link to="/login" style={{textDecoration: "none"}}>Logout</Link>  }
                            </Nav.Link>
                            <NavDropdown
                                title="Menu"
                                id={`offcanvasNavbarDropdown-expand-md`}
                            >
                                <NavDropdown.Item >
                                {auth.email ? <Link to="/personal/products"  style={{textDecoration: "none"}}>Adauga produs</Link> : <Link to="/login"  style={{textDecoration: "none"}}>Login</Link>  }
                                </NavDropdown.Item>
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