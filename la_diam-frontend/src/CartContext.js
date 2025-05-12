import React, { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  const removeFromCart = useCallback((product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cardContextValue = React.useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [cart, addToCart, removeFromCart, clearCart]
  );

  return (
    <CartContext.Provider value={cardContextValue}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;