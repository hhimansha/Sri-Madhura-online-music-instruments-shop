import './App.css';
import TopNav from './components/topNav';
import Footer from './components/Footer';
import RentHome from './components/Rental/RentHomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDash from './components/Admin/AdminDash';
import RentalItemCreate from './components/Rental/RentalItemCreate';
import RentalItemDisplay from './components/Rental/RentalItemDisplay';
import RentalManage from './components/Rental/RentalManage';
import UpdateRental from './components/Rental/UpdateRental';
import HeaderPart from './components/sell/headerPart';
import Home from './components/sell/Home';
import Cart from './components/sell/Cart';
import Order from './components/sell/Order';
import AddProducts from './components/Admin/AddProducts';
import ProductPage from './components/sell/productPage';
import UserAddress from './components/sell/UserAddress';
import UpdateAddressinOrder from './components/sell/UpdateAddressinOrder';
import { AuthContextProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProteinsContextProvider } from './context/ProteinsContext'; // Import ProteinsContextProvider
import User_login from './components/User/User_login';
import User_signup from './components/User/User_signup';
import Reset from './components/User/Reset';
import Recovery from './components/User/Recovery';
import Profile from './components/User/Profile';
import Admindashh from './components/Admin/Admindashh';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <CartProvider>
          <ProteinsContextProvider> {/* Wrap the entire application with ProteinsContextProvider */}
            <div className="App">
              <TopNav />
              <Routes>
                <Route path="/" element={<><Home /><Footer /></>} />
                <Route path="/product/:proteinId" element={<><ProductPage /><Footer /></>} />
                <Route path="/cart" element={<><Cart /><Footer /></>} />
                <Route path="/user/address" element={<><UserAddress /><Footer /></>} />
                <Route path="/user/order-address" element={<><UpdateAddressinOrder /><Footer /></>} />
                <Route path="/place-order" element={<><Order /><Footer /></>} />
                <Route path="/admindash/products" element={<><AdminDash /><AddProducts /></>} />
                <Route path="/admindash/rentals/rentalcreate" element={<><AdminDash /><RentalItemCreate /></>} />
                <Route path="/admindash/rentals/update/:id" element={<><AdminDash /><UpdateRental /></>} />
                <Route path="/admindash/rentals" element={<><AdminDash /><RentalManage /></>} />
                <Route path="/rentals" element={<><RentHome /><RentalItemDisplay /><Footer /></>} />
                <Route path="/rentals/:id" element={<><RentHome /><Footer /></>} />
                <Route path="/admindash" element={<AdminDash />} />
                <Route path="/admindash1" element={<Admindashh />} />
                <Route path="/admindash/orders" element={<Admindashh />} />

                <Route path="/login" element={<User_login />} />
                <Route path="/signup" element={<User_signup />} />
                <Route path="/reset/:token" element={<Reset />} />
                <Route path="/recover" element={<Recovery />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </ProteinsContextProvider>
        </CartProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
