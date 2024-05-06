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
import HeaderPart from './components/Sell/headerPart'
import Home from './components/Sell/home';
import Cart from './components/Sell/Cart';
import Order from './components/Sell/Order';
import AddProducts from './components/Admin/AddProducts';
import ProductPage from './components/Sell/productPage';
import UserAddress from './components/Sell/UserAddress';
import UpdateAddressinOrder from './components/Sell/UpdateAddressinOrder';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<><Home /><Footer /></>} />
        <Route path="/product/:proteinId" element={<><HeaderPart /><ProductPage /><Footer /></>} />
        <Route
         path="/cart"
         element={ <><HeaderPart /><Cart /><Footer /></>}
        />
           <Route
                        path="/user/address"
                        element={ <><HeaderPart /><UserAddress /><Footer /></>}
                    />
                    <Route
                        path="/user/order-address"
                        element={ <><HeaderPart /><UpdateAddressinOrder /><Footer /></> }
                    />
      
                    <Route
                        path="/place-order"
                        element={ <><HeaderPart /><Order /><Footer /></> }
                    />
                    <Route
                        path="/admindash/products"
                        element={
                            <>
                                <AdminDash />
                                <AddProducts />
                            </>
                       
                        }
                    />
          <Route path="/admindash/rentals/rentalcreate" element={<><AdminDash /><RentalItemCreate /></>} />
          <Route path="/admindash/rentals/update/:id" element={<><AdminDash /><UpdateRental /></>} />
          <Route path="/admindash/rentals" element={<><AdminDash /><RentalManage /></>} />
          <Route path="/rentals" element={<><TopNav/><RentHome /><RentalItemDisplay /><Footer/></>} />
          <Route path="/rentals/:id" element={<><TopNav/><RentHome /><Footer/></>} />
          
          <Route
           path="/admindash"
            element={<AdminDash />}
          />
        </Routes>
      

      
    </div>
    </Router>
    
  );
}

export default App;
