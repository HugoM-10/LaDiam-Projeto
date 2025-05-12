import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Badge,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import "./Product.css";

const Product = ({ product }) => {
  const price = parseFloat(product.price);
  const promotion = parseFloat(product.promotion) || 0;
  const promotionalPrice = ((price * (100 - promotion)) / 100).toFixed(2);
  console.log("Price:", price);
  console.log("Promotion:", promotion);
  console.log("Promotional Price:", promotionalPrice);

  const isOnPromotion = promotion > 0;

  return (
    <Card className="product-container">
      <CardBody>
        <CardTitle tag="h3">
          <h1>{product.name}</h1>
        </CardTitle>
      </CardBody>
      <img src={product.image_link} alt={product.name} className="image" />
      <CardBody>
        <CardText>{product.description}</CardText>
        <Row className="align-items-center mb-2">
          <Col>
            {isOnPromotion ? (
              <>
                <span className="text-muted text-decoration-line-through">
                  {price.toFixed(2)} €
                </span>
                <span className="text-danger ms-2 fs-5 fw-bold">
                  {promotionalPrice} €
                </span>
              </>
            ) : (
              <span className="fs-5 fw-bold">{price.toFixed(2)} €</span>
            )}
          </Col>
          {isOnPromotion && (
            <Col xs="auto">
              <Badge color="success" pill>
                -{promotion}%
              </Badge>
            </Col>
          )}
        </Row>
        <Button color="danger">Adicionar ao carrinho</Button>
      </CardBody>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image_link: PropTypes.string.isRequired,
    promotion: PropTypes.string, // ou number se for garantido
  }).isRequired,
};

export default Product;
