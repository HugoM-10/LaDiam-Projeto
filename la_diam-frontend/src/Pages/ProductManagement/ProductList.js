import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container, Pagination } from "react-bootstrap";
import { fetchProducts } from "../../BackendCalls/getters";
import { getImageDjango } from "../../Utils/Utils";

const ProductList = ({ onEditSelect }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response);
      } catch {
        setProducts([]);
      } finally {
      }
    };
    loadProducts();
  }, []);
  return (
    <Container className="mt-4">
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={
                  getImageDjango(product.image) ||
                  "https://via.placeholder.com/150"
                }
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>Preço:</strong> {product.default_price}€
                  {product.discount_price && (
                    <>
                      <br />
                      <strong>Desconto:</strong> {product.discount_price}€
                    </>
                  )}
                </Card.Text>
                <Button variant="primary" onClick={() => onEditSelect(product)}>
                  Edita este produto
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
