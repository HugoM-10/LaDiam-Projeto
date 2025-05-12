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
  const price = parseFloat(product.default_price);
  const promotion = parseFloat(product.promotion) || 0;
  const promotionalPrice = parseFloat(product.discount_price) || 0;
  console.log("Price:", price);
  console.log("Promotion:", promotion);
  console.log("Promotional Price:", promotionalPrice);
  console.log(product.image_link);

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
        <div className="d-flex justify-content-center">
          <Button color="danger" onClick={()=>alert("Falta implementar")}>Adicionar ao carrinho</Button>
        </div>
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
    promotion: PropTypes.string,
  }).isRequired,
};

export default Product;
