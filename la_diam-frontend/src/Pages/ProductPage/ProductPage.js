import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import ProductInfo from "./ProductInfo/ProductInfo";
import CommentsSection from "./CommentsSection/CommentsSection";
import { fetchProducts, fetchProductComments } from "../../BackendCalls/getters";
import { CartContext } from "../../CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Buscar produto
    fetchProducts().then(products => {
      const found = products.find(p => String(p.id) === String(id));
      setProduct(found);
    });
    // Buscar comentários
    fetchProductComments(id).then(setComments);
  }, [id]);

  return (
    <div>
      <p>Isto é a página do produto</p>
      <Row>
        <Col md={8}>
          <ProductInfo product={product} addToCart={addToCart} />
        </Col>
        <Col md={4}>
          <CommentsSection initialComments={comments} />
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
