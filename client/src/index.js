import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RentalItemProvider } from './context/rentalItemContext'; // Import RentalItemProvider
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RentalItemProvider>
        <App />
      </RentalItemProvider>
      </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
