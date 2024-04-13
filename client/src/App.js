import './App.css';
import TopNav from './components/topNav';
import Footer from './components/Footer';
import RentHome from './components/Rental/RentHomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDash from './components/Admin/AdminDash';
import RentalItemCreate from './components/Rental/RentalItemCreate';
import User_signup from './components/User/User_signup';
import User_login from './components/User/User_login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/rentalcreate" element={<><AdminDash /><RentalItemCreate /></>} />
          <Route path="/login" element={<User_login />} /> {/* New route for user login */}
          <Route path="/signup" element={<User_signup />} /> {/* New route for user signup */}
          <Route path="/" element={<><TopNav/><RentHome /><Footer/></>} />
          <Route path="/admindash" element={<AdminDash />} />
          
        </Routes>
      

      
    </div>
    </Router>
    
  );
}

export default App;
