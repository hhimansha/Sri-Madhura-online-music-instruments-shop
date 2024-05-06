import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { OrderContextProvider } from './context/OrderContext';
import {ProteinsContextProvider} from './context/ProteinsContext';
import { CartProvider } from './context/CartContext';
import { RentalItemProvider } from './context/rentalItemContext'; // Import RentalItemProvider

ReactDOM.render(
  <React.StrictMode>
    <OrderContextProvider>
        <ProteinsContextProvider>
          <CartProvider>
    <RentalItemProvider> {/* Wrap App with RentalItemProvider */}
      <App />
    </RentalItemProvider>
    </CartProvider>
        </ProteinsContextProvider>
      </OrderContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);