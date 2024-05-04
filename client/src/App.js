import './App.css';
import TopNav from './components/topNav';
import Footer from './components/Footer';
import RentHome from './components/Rental/RentHomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDash from './components/Admin/AdminDash';
import RentalItemCreate from './components/Rental/RentalItemCreate';
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
          <Route path="/rentalcreate" element={<><AdminDash /><RentalItemCreate /></>} />
          <Route path="/login" element={<User_login />} /> {/* New route for user login */}
          <Route path="/signup" element={<User_signup />} /> {/* New route for user signup */}
          <Route path="/reset/:token" element={<Reset/>} /> 
          <Route path="/recover" element={<Recovery/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/" element={<><TopNav/><RentHome /><Footer/></>} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/usermanage" element={<><AdminDash /> <Usermanage/></>} />
          
        </Routes>
      

      
    </div>
    </Router>
    
  );
}

export default App;
