import React, { useEffect, useState, useContext, useCallback } from "react";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import Product from "../../Components/Product/Product";
import { CartContext } from "../../CartContext";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { fetchProductsPaginated } from "../../BackendCalls/getters";

const PRODUCT_TYPES = ["Pizza", "Drink", "Dessert", "Appetizer", "Other"];

const ComboMenu = () => {
  const [comboProducts, setComboProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [missingTypes, setMissingTypes] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const loadCombo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const productsByType = {};
      const unavailableTypes = [];
      for (const type of PRODUCT_TYPES) {
        const { products } = await fetchProductsPaginated(1, type);
        const available = products.filter(p => p.is_available);
        productsByType[type] = available;
        if (productsByType[type].length === 0) {
          unavailableTypes.push(type);
        }
      }

      setMissingTypes(unavailableTypes);

      const combo = PRODUCT_TYPES
        .map(type => {
          const products = productsByType[type];
          if (products.length === 0) return null;
          const randomIndex = Math.floor(Math.random() * products.length);
          return products[randomIndex];
        })
        .filter(Boolean);

      setComboProducts(combo);
    } catch (err) {
      console.error("Erro ao carregar combo de produtos:", err);
      setError("Failed to load combo products");
      setComboProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCombo();
  }, [loadCombo]);

  const handleAddAllToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    comboProducts.forEach(product => addToCart(product));
    // Optional: Show success notification
  };

  const handleRefreshCombo = () => {
    loadCombo();
  };

  return (
    <Container className="my-5">
  <h2 className="mb-4 text-center">Combo Menu</h2>
  
  {loading && (
    <div className="text-center">
      <Spinner color="danger" />
      <p className="text-muted mt-2">A carregar produtos do combo...</p>
    </div>
  )}

  {error && (
    <div className="text-center text-danger">
      <p>{error}</p>
      <Button color="danger" onClick={loadCombo}>
        Tentar novamente
      </Button>
    </div>
  )}

  {!loading && !error && (
    <>
      {missingTypes.length > 0 && (
        <p className="text-center text-warning">
          Nota: Não há produtos disponíveis para: {missingTypes.join(", ")}
        </p>
      )}

      {comboProducts.length === 0 ? (
        <p className="text-center text-muted">Nenhum produto disponível para o combo.</p>
      ) : (
        <>
          <Row className="g-4">
            {comboProducts.map(product => (
              <Col key={product.id} xl={3} lg={4} md={6} className="mb-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button color="warning" size="lg" onClick={handleAddAllToCart}>
              Adicionar Combo ao Carrinho
            </Button>
            <Button color="danger" size="lg" outline onClick={handleRefreshCombo}>
              Gerar Novo Combo
            </Button>
          </div>
        </>
      )}
    </>
  )}
</Container>
  );
};

export default ComboMenu;