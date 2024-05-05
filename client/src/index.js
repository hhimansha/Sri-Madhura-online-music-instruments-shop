import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RentalItemProvider } from './context/rentalItemContext'; // Import RentalItemProvider

ReactDOM.render(
  <React.StrictMode>
      <RentalItemProvider>
        <App />
      </RentalItemProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
