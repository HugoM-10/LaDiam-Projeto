import React, { useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Product.css";
import { CartContext } from "../../CartContext";
import { UserContext } from "../../UserContext";
import { getImageDjango } from "../../Utils/Utils";
import StarRating from "../StarRating/StarRating"; // <-- Importa o componente

const Product = ({ product }) => {
  const price = parseFloat(product.default_price);
  const promotion = parseFloat(product.promotion) || 0;
  const promotionalPrice = parseFloat(product.discount_price);

  const { isLoggedIn } = useContext(UserContext);

  const isOnPromotion = promotion > 0;

  const { addToCart, cart } = useContext(CartContext);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isLoggedIn) {
      addToCart(product);
    } else {
      navigate("/login");
    }
  };

  const handleImageClick = () => {
    navigate(`/ProductPage/${product.id}`, { state: { product: product, cart: cart } });
  };

  return (
    <Card className="product-container">
      <CardBody>
        <CardTitle tag="h3">{product.name}</CardTitle>
      </CardBody>
      <img
        src={getImageDjango(product.image)}
        alt={product.name}
        className="image"
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />
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
        <div className="mb-2 d-flex align-items-center">
          {Number(product.number_of_ratings) === 0 ? (
            <span className="text-muted">Sem avaliações</span>
          ) : (
            <>
              <StarRating value={Number(product.average_rating ?? 0)} size={22} />
              <span className="ms-2">
                ({Number(product.number_of_ratings)} avaliações)
              </span>
            </>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <Button color="danger" onClick={handleSubmit}>
            Adicionar ao carrinho
          </Button>
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
    discount_price: PropTypes.string.isRequired,
    default_price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    promotion: PropTypes.string,
    average_rating: PropTypes.number.isRequired,
    number_of_ratings: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
