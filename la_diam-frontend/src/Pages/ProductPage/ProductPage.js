import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { useLocation, useParams } from "react-router-dom";
import ProductInfo from "./ProductInfo/ProductInfo";
import CommentsSection from "./CommentsSection/CommentsSection";
import Ratings from "./Ratings/Ratings";
import { CartContext } from "../../CartContext";
import { fetchProduct } from "../../BackendCalls/getters";

const ProductPage = () => {
  const location = useLocation();
  const params = useParams();
  const { addToCart, cart } = useContext(CartContext);

  // Estado para o produto
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se já temos o produto via location, não faz fetch
    if (product) return;

    // Se não temos, faz fetch pelo id da URL
    const fetchProductA = async () => {
      setLoading(true);
      setError(null);
      try {
        const product = await fetchProduct(params.id);
        if (product) {
          setProduct(product);
        } else {
          setError("Produto não encontrado.");
        }
      } catch (err) {
        setError("Erro ao carregar produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductA();
    // eslint-disable-next-line
  }, [params.id]);

  if (loading) return <div>A carregar produto...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Produto não encontrado.</div>;

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
