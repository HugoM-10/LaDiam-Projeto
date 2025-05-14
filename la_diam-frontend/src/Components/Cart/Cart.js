import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../CartContext";
import "./Cart.css";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  // Renderiza os itens do carrinho
  const renderCartItems = () => {
    return cart.map((item) => (
      <div key={item.product.id} className="cart-item">
        <img
          src={item.product.image_link}
          alt={item.product.name}
          className="image"
        />
        <div className="cart-item-details">
          <p className="product-name">{item.product.name}</p>
          <div className="quantity-controls">
            <button
              className="quantity-button"
              onClick={() => removeFromCart(item.product)}
              aria-label="Diminuir quantidade"
            >
              -
            </button>
            <span className="quantity">{item.quantity}</span>
            <button
              className="quantity-button"
              onClick={() => addToCart(item.product)}
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>
        </div>
      </div>
    ));
  };


  useEffect(() => {
    const handleCartChange = () => {
     if(cart.length > 0) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    handleCartChange();
  }, [cart]);

  return (
    <div
      className="cart-container"
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Ícone do carrinho */}
      <button  aria-label="Carrinho">
        <FaShoppingCart className="icon" />
      </button>
      

      {/* Conteúdo do carrinho visível apenas no hover */}
      {isOpen && (
        <div className="cart-menu">
          {cart.length === 0 ? (
            <p className="empty-cart">Carrinho vazio</p>
          ) : (
            <>
              {renderCartItems()}
              <button
                className="checkout-button"
                onClick={clearCart}
                aria-label="Finalizar compra"
              >
                Finalizar
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};