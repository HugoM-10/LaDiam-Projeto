import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import PropTypes from "prop-types";

import "./Product.css";

const Product = ({ product }) => {
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
  console.log("Product:", product);
  return (
    <Card className="product-container">
      <CardBody>
        <CardTitle tag="h5">
          <h1>{product.name}</h1>
        </CardTitle>
      </CardBody>
      <img src={product.image_link} alt={product.name} className="image"></img>
      <CardBody>
        <CardText>{product.description}</CardText>
        <CardText>{product.price}</CardText>
        <CardText>{product.promotion}</CardText>
      </CardBody>
    </Card>
  );
};

export default Product;
