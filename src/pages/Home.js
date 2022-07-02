import React from "react";
//import Nav from "../components/Navs/loginNav"
import { useState, useRef, useEffect } from "react";
import {Col, Container, Row} from 'react-bootstrap/'
import ProductItem from "../components/Products/ProductItem"
import GlobalNav from "../components/Navs/searchBar";
import Users from '../components/Users'
import axios from "../Utils/axios_main";

const HomePage = () => {
    const [products, setProdutcs] = useState([]);
    const [filter, setFilter] = useState({});
    const [filtredProducts, setFilteredProducts] = useState([]);
    
    useEffect( () => {
         axios.get('/products/getAll')
        .then(response => {
            console.log("Response" + response);
            setProdutcs(response.data.products);
            setFilteredProducts(response.data.products);
        }).catch( ex=>{
            console.log(ex)
        })

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