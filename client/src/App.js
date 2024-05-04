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

import Home from './components/SellInstrument/Home';
import CreateItem from './components/SellInstrument/CreateItem';
import EditItem from './components/SellInstrument/EditItem';
import DeleteItem from './components/SellInstrument/DeleteItem';
import ShowItem from './components/SellInstrument/ShowItem';
import AdminSellItemHome from './components/SellInstrument/AdminSellItemHome';

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

          <Route path='/repair/home' element={<Home />} />
          
          <Route path='/sellItem/home' element={<Home />} />
          <Route path='/sellItem/adminhome' element={<AdminSellItemHome />} />
          <Route path='/sellItem/create' element={<CreateItem />} />
          <Route path='/sellItem/details/:id' element={<ShowItem />} />
          <Route path='/sellItem/edit/:id' element={<EditItem />} />
          <Route path='/sellItem/delete/:id' element={<DeleteItem />} />
          
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
