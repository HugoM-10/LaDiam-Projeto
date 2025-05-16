import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { fetchProducts } from '../../BackendCalls/getters'; // Adjust path as needed

const ProductList = ({ onEditSelect }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts(); // Must return an array of product objects
            setProducts(data);
        };
        getProducts();
    }, []);

    return (
        <Container className="mt-4">
            <h3>Select a Product to Edit</h3>
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={product.image || 'https://via.placeholder.com/150'} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>
                                    <strong>Price:</strong> ${product.default_price}
                                    {product.discount_price && (
                                        <>
                                            <br />
                                            <strong>Discount:</strong> ${product.discount_price}
                                        </>
                                    )}
                                </Card.Text>
                                <Button variant="primary" onClick={() => onEditSelect(product)}>
                                    Edit This Product
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
