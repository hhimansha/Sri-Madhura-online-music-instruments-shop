import './App.css';
import TopNav from './components/topNav';
import Footer from './components/Footer';
import Home from './components/Repairs/Home'
import HomeUser from './components/Repairs/HomeUser'
import DetailsHome from './components/RepairDetails/DetailsHome'
import CreateRequest from './components/Repairs/CreateRequest'
import EditRequest from './components/Repairs/EditRequest'
import DeleteRequest from './components/Repairs/DeleteRequest'
import SendEmail from './components/Repairs/SendEmail'
import CreatePrices from './components/RepairDetails/CreatePrices'
import EditPrice from './components/RepairDetails/EditPrice'
import DeletePrice from './components/RepairDetails/DeletePrice'
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admindash/rentals/rentalcreate" element={<><AdminDash /><RentalItemCreate /></>} />
          <Route path="/admindash/rentals/update/:id" element={<><AdminDash /><UpdateRental /></>} />
          <Route path="/admindash/rentals" element={<><AdminDash /><RentalManage /></>} />
          <Route path="/rentals" element={<><TopNav/><RentHome /><RentalItemDisplay /><Footer/></>} />
          <Route path="/rentals/:id" element={<><TopNav/><RentHome /><Footer/></>} />
          <Route path="/rentalcreate" element={<><AdminDash /><RentalItemCreate /></>} />
          <Route path="/login" element={<User_login />} /> {/* New route for user login */}
          <Route path="/signup" element={<User_signup />} /> {/* New route for user signup */}
          <Route path="/reset/:token" element={<Reset/>} /> 
          <Route path="/recover" element={<Recovery/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/" element={<><TopNav/><RentHome /><Footer/></>} />
          <Route path='/repair/create' element={<CreateRequest />} />
          <Route path='/repair/edit/:id' element={<EditRequest />} />
          <Route path='/repair/delete/:id' element={<DeleteRequest />} />
          <Route path='/prices/create' element={<CreatePrices />} />
          <Route path='/prices/edit/:id' element={<EditPrice />} />
          <Route path='/prices/delete/:id' element={<DeletePrice />} />
          <Route path='/repair/home' element={<Home />} /> 
          <Route path='/repair/homeUser' element={<HomeUser />} />
          <Route path='/prices/DetailsHome' element={<DetailsHome />} /> 
          <Route path="/send-email" element={<SendEmail />} />


          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/usermanage" element={<><AdminDash /> <Usermanage/></>} />
          
        </Routes>
      

      
    </div>
    </Router>
    
  );
}

export default App;
