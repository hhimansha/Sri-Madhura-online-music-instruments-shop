import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RentalItemProvider } from './context/rentalItemContext'; // Import RentalItemProvider
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <RentalItemProvider>
        <App />
      </RentalItemProvider>
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
