import React from "react";
import { Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import ProductInfo from "./ProductInfo/ProductInfo";
import CommentsSection from "./CommentsSection/CommentsSection";

const ProductPage = () => {
  const location = useLocation();
  const { product, cart } = location.state || {};

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div style={{ padding: "32px" }}>
      <Row>
        <Col md={8}>
          <ProductInfo product={product} cart={cart} />
        </Col>
        <Col md={4}>
          <CommentsSection productId={product.id} />
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
