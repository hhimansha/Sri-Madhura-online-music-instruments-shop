import './App.css';
import TopNav from './components/topNav';
import Footer from './components/Footer';
import RentHome from './components/Rental/RentHomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDash from './components/Admin/AdminDash';
import RentalItemCreate from './components/Rental/RentalItemCreate';
import RentalItemDisplay from './components/Rental/RentalItemDisplay';
import RentalManage from './components/Rental/RentalManage';
import UpdateRental from './components/Rental/UpdateRental';
import HeaderPart from './components/sell/headerPart';
import Home from './components/sell/Home'
import Cart from './components/sell/Cart'
import Order from './components/sell/Order'
import AddProducts from './components/Admin/AddProducts';
import ProductPage from './components/sell/productPage'
import UserAddress from './components/sell/UserAddress'
import UpdateAddressinOrder from './components/sell/UpdateAddressinOrder'
import { AuthContextProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Import CartProvider

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <CartProvider> {/* Wrap the entire application with CartProvider */}
          <div className="App">
            <Routes>
              <Route path="/" element={<><TopNav /><Home /><Footer /></>} />
              <Route path="/product/:proteinId" element={<><TopNav /><ProductPage /><Footer /></>} />
              <Route path="/cart" element={ <><TopNav /><Cart /><Footer /></>} />
              <Route path="/user/address" element={ <><TopNav /><UserAddress /><Footer /></>} />
              <Route path="/user/order-address" element={ <><TopNav /><UpdateAddressinOrder /><Footer /></> } />
              <Route path="/place-order" element={ <><TopNav /><Order /><Footer /></> } />
              <Route path="/admindash/products" element={ <><AdminDash /><AddProducts /></>} />
              <Route path="/admindash/rentals/rentalcreate" element={<><AdminDash /><RentalItemCreate /></>} />
              <Route path="/admindash/rentals/update/:id" element={<><AdminDash /><UpdateRental /></>} />
              <Route path="/admindash/rentals" element={<><AdminDash /><RentalManage /></>} />
              <Route path="/rentals" element={<><TopNav/><RentHome /><RentalItemDisplay /><Footer/></>} />
              <Route path="/rentals/:id" element={<><TopNav/><RentHome /><Footer/></>} />
              <Route path="/admindash1" element={<AdminDash />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
