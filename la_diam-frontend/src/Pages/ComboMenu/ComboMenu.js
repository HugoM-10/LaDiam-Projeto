import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Product from "../../Components/Product/Product";
import { CartContext } from "../../CartContext";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../BackendCalls/getters";

const PRODUCT_TYPES = ["Pizza", "Drink", "Dessert", "Appetizer", "Other"];

const ComboMenu = () => {
  const [comboProducts, setComboProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCombo = async () => {
      setLoading(true);
      try {
        const { products: allProducts } = await fetchProducts();


        // Agrupar produtos por tipo
        const productsByType = {};
        PRODUCT_TYPES.forEach(type => {
          productsByType[type] = allProducts.filter(p => p.type === type && p.is_available);
        });

        // Selecionar um produto aleatório de cada tipo
        const combo = PRODUCT_TYPES.map(type => {
          const products = productsByType[type];
          if (products.length === 0) return null;
          const randomIndex = Math.floor(Math.random() * products.length);
          return products[randomIndex];
        }).filter(Boolean); // Remove nulls

        setComboProducts(combo);
      } catch (error) {
        console.error("Erro ao carregar combo de produtos:", error);
        setComboProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadCombo();
  }, []);

  const handleAddAllToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    comboProducts.forEach(product => addToCart(product));
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Combo Menu</h2>
      {loading ? (
        <p className="text-center text-muted">A carregar produtos do combo...</p>
      ) : comboProducts.length === 0 ? (
        <p className="text-center text-muted">Nenhum produto disponível para o combo.</p>
      ) : (
        <>
          <Row>
            {comboProducts.map(product => (
              <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-3">
            <Button color="success" size="lg" onClick={handleAddAllToCart}>
              Adicionar Combo ao Carrinho
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default ComboMenu;
