// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext(); // Export CartContext

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCarts = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCarts);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
