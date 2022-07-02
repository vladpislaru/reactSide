import React from 'react';
import AddProducts from '../components/Products/AddProducts';
import { Container, Row, Col } from 'react-bootstrap';
import GlobalNav from '../components/Navs/searchBar';
const Products = () => {
    return (
        <Container>
                <Row>
                    <GlobalNav/>
                </Row>
                <Row>
                    <AddProducts></AddProducts>                   
                </Row>
                {/* <Row>
                    <Col>
                        <Users></Users>
                    </Col>
                </Row> */}
            </Container>
    );
};

export default Products;