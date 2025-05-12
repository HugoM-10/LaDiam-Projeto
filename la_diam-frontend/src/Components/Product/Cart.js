import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../CartContext";

export const Cart = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const { cart, addToCard, removeFromCart, clearCart } = useContext(CartContext);
  

  return (
    <div>
      <div
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
        style={{ cursor: "pointer" }}
      >
        {openMenu ? (
          <div>
            <h1>Menu aberto</h1>
            <ul>
              {cart.map((item) => (
                <li key={item.product.id}>
                  <span>{item.product.name}</span>
                  <span> - Quantidade: {item.quantity}</span>
                  <button onClick={() => removeFromCart(item.product)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h1>
            <FaShoppingCart className="icon" />
          </h1>
        )}
      </div>
    </div>
  );
};
