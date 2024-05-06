// useCart.js
import { useContext } from 'react';
import { CartContext } from '../context1/CartContext'; // Update import statement

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
