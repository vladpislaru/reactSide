import React from "react";
//import Nav from "../components/Navs/loginNav"
import { useState, useRef, useEffect, useContext } from "react";
import {Col, Container, Row} from 'react-bootstrap/'
import ProductItem from "../components/Products/ProductItem"
import GlobalNav from "../components/Navs/searchBar";
import Users from '../components/Users'
import axios from "../Utils/axios_main";
import AuthSession from "../Utils/AuthSession";
const HomePage = () => {
    const [products, setProdutcs] = useState([]);
    const [filter, setFilter] = useState({});
    const [filtredProducts, setFilteredProducts] = useState([]);
    const {auth, setAuth} = useContext(AuthSession);

    useEffect( () => {

            setProdutcs(auth.products)

    }, [])
    return(
        < >
            <Container >
                <Row>
                    <GlobalNav/>
                </Row>
                <Row>
                    <Col >
                        {products.length ? products.map(product => 
                            <ProductItem attributes={product} key={product.Id} />
                        ) : ""}
                        {/* <ProductItem/>
                        <ProductItem/> */}
                    </Col>
                    
                </Row>
                {/* <Row>
                    <Col>
                        <Users></Users>
                    </Col>
                </Row> */}
            </Container>
            
            
        </>
    )
}

export default HomePage;