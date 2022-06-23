import React from "react";
//import Nav from "../components/Navs/loginNav"
import {Col, Container, Row} from 'react-bootstrap/'
import ProductItem from "../components/Products/ProductItem"
import GlobalNav from "../components/Navs/searchBar";
import Users from '../components/Users'
const HomePage = () => {
    return(
        < >
            <Container>
                <Row>
                    <GlobalNav/>
                </Row>
                <Row>
                    <Col >
                        <ProductItem/>
                        <ProductItem/>
                        <ProductItem/>
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