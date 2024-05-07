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
import User_signup from './components/User/User_signup';
import User_login from './components/User/User_login';
import Reset from './components/User/Reset';
import Recovery from './components/User/Recovery';
import Profile from './components/User/Profile';
import Usermanage from './components/User/Usermanage';
import RentalItemPage from './components/Rental/rentalItemPage';
import RentalOrdersManage from './components/Rental/RentalOrdersManage';
import Cart from './components/sell/Cart'
import OrderHandler from './components/Admin/orderHandler'
import Productpage from './components/sell/productPage'
import UserAddress from './components/sell/UserAddress'
import Order from './components/sell/Order'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route
                        path="/admindash/orders"
                        element={user?.Admin ? (
                            <>
                                <AdminDash />
                                <OrderHandler />
                            </>
                        ) : (
                            <Navigate to="/" />
                        )}
                    />
          <Route path="/admindash/rentals/rentalcreate" element={<><AdminDash /><RentalItemCreate /></>} />
          <Route path="/admindash/rentals/update/:id" element={<><AdminDash /><UpdateRental /></>} />
          <Route path="/admindash/rentals" element={<><AdminDash /><RentalManage /></>} />
          <Route path="/admindash/rental-orders" element={<><AdminDash /><RentalOrdersManage /></>} />
          <Route path="/rentals" element={<><TopNav/><RentHome /><RentalItemDisplay /><Footer/></>} />

          <Route path="/login" element={<User_login />} /> {/* New route for user login */}
          <Route path="/signup" element={<User_signup />} /> {/* New route for user signup */}
          <Route path="/product/:proteinId" element={<Productpage />} />
          <Route path="/reset/:token" element={<Reset/>} /> 
          <Route path="/recover" element={<Recovery/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/" element={<><TopNav/><RentHome /><Footer/></>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user/address" element={user ? <UserAddress /> : <Navigate to="/" />}/>
          <Route path="/place-order" element={user ? <Order /> : <Navigate to="/login" />}/>


          


          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/usermanage" element={<><AdminDash /> <Usermanage/></>} />

          <Route path="/rentals/:id" element={<><TopNav/><RentalItemPage /><Footer/></>} />

          
        </Routes>
      

      
    </div>
    </Router>
    
  );
}

export default App;
