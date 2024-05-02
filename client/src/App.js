import './App.css';
import TopNav from './components/topNav';
import Footer from './components/Footer';
import Home from './components/Repairs/Home'
import HomeUser from './components/Repairs/HomeUser'
import CreateRequest from './components/Repairs/CreateRequest'
import EditRequest from './components/Repairs/EditRequest'
import DeleteRequest from './components/Repairs/DeleteRequest'
import SendEmail from './components/Repairs/SendEmail'
import CreatePrices from './components/RepairDetails/CreatePrices'
import RentHome from './components/Rental/RentHomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDash from './components/AdminDash';
import RentalItemCreate from './components/Rental/RentalItemCreate';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/rentalcreate" element={<><AdminDash /><RentalItemCreate /></>} />
          <Route path="/" element={<><TopNav/><RentHome /><Footer/></>} />
          <Route path = '/repair/create' element={<CreateRequest />} />
          <Route path = '/repair/edit/:id' element={<EditRequest />} />
          <Route path = '/repair/delete/:id' element={<DeleteRequest />} />
          <Route path = '/prices/create' element={<CreatePrices />} />
          <Route path = '/repair/home' element={<Home />} />
          <Route path = '/repair/homeUser' element={<HomeUser />} />
          <Route path="/send-email" element={<SendEmail />} />
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
