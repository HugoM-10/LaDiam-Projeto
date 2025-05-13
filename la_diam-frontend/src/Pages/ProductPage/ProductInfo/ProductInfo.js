// src/components/ProductInfo.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  Badge,
  Modal,
  ModalBody
} from 'reactstrap';

const ProductInfo = ({ product, addToCart }) => {
  const [zoomOpen, setZoomOpen] = useState(false);

  const default_price = parseFloat(product.default_price);
  const promotion = parseFloat(product.promotion || 0);
  const isOnPromotion = promotion > 0;
  const promotionalPrice = isOnPromotion
    ? (default_price * (1 - promotion / 100)).toFixed(2)
    : null;

  const handleImageClick = () => {
    setZoomOpen(true);
  };

  const handleZoomClose = () => {
    setZoomOpen(false);
  };

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle tag="h3">
          <h1>{product.name}</h1>
        </CardTitle>
      </CardBody>

      <img
        src={product.image_link}
        alt={product.name}
        className="img-fluid"
        onClick={handleImageClick}
        style={{ cursor: 'pointer', maxHeight: '400px', objectFit: 'cover' }}
      />

      {/* Modal de zoom */}
      <Modal isOpen={zoomOpen} toggle={handleZoomClose} centered size="lg">
        <ModalBody className="text-center">
          <img
            src={product.image_link}
            alt={product.name}
            style={{ maxWidth: '100%', maxHeight: '80vh' }}
          />
        </ModalBody>
      </Modal>

      <CardBody>
        <CardText className="mb-3">{product.description}</CardText>

        <Row className="align-items-center mb-3">
          <Col>
            {isOnPromotion ? (
              <>
                <span className="text-muted text-decoration-line-through">
                  {default_price.toFixed(2)} €
                </span>
                <span className="text-danger ms-2 fs-5 fw-bold">
                  {promotionalPrice} €
                </span>
              </>
            ) : (
              <span className="fs-5 fw-bold">{default_price.toFixed(2)} €</span>
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
          <Button color="danger" onClick={() => addToCart(product)}>
            Adicionar ao carrinho
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    image_link: PropTypes.string.isRequired,
    promotion: PropTypes.string
  }),
  addToCart: PropTypes.func.isRequired
};

export default ProductInfo;
