import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import ProductInfo from "./ProductInfo/ProductInfo";
import CommentsSection from "./CommentsSection/CommentsSection";
import Ratings from "./Ratings/Ratings";
import { CartContext } from "../../CartContext";

const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { addToCart, cart } = useContext(CartContext);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div style={{ padding: "32px", minHeight: "80vh" }}>
      <Row style={{ minHeight: "70vh" }}>
        <Col md={8} className="d-flex flex-column h-100">
          <ProductInfo product={product} cart={cart} addToCart={addToCart} />
        </Col>
        <Col md={4} className="d-flex flex-column h-100">
          <div className="d-flex flex-column h-100">
            <CommentsSection />
            <Ratings />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
