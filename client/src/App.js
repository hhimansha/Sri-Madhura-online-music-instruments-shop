import './App.css';
import TopNav from './components/topNav';
import Footer from './components/Footer';
import Home from './components/Repairs/Home'
import CreateRequest from './components/Repairs/CreateRequest'
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
          <Route path = '' element={<Home />} />
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
