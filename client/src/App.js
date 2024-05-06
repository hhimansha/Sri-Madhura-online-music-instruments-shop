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

import SellItemHome from './components/SellInstrument/SellItemHome';
import CreateItem from './components/SellInstrument/CreateItem';
import EditItem from './components/SellInstrument/EditItem';
import DeleteItem from './components/SellInstrument/DeleteItem';
import ShowItem from './components/SellInstrument/ShowItem';
import AdminSellItemHome from './components/SellInstrument/AdminSellItemHome';

import SupHome from './components/Supplier/SupHome';
import CreateOrder from './components/Supplier/CreateOrder';
import EditOrder from './components/Supplier/EditOrder';
import DeleteOrder from './components/Supplier/DeleteOrder'
import ShowOrder from './components/Supplier/ShowOrder';
import SendEmail from './components/Supplier/SendEmail';



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

          <Route path='/sellItem/sellitemhome' element={<SellItemHome />} />
          <Route path='/sellItem/adminhome' element={<AdminSellItemHome />} />
          <Route path='/sellItem/create' element={<CreateItem />} />
          <Route path='/sellItem/details/:id' element={<ShowItem />} />
          <Route path='/sellItem/edit/:id' element={<EditItem />} />
          <Route path='/sellItem/delete/:id' element={<DeleteItem />} />

          <Route path='/suprequest/suphome' element={<SupHome />} />
          <Route path='/suprequest/create' element={<CreateOrder />} />
         <Route path='/suprequest/details/:id' element={<ShowOrder />} />
         <Route path='/suprequest/edit/:id' element={<EditOrder />} />
         <Route path='/suprequest/delete/:id' element={<DeleteOrder />} />
         <Route path="/send-email" element={<SendEmail />} />
         <Route path="/suprequest" element={<><TopNav/><Footer/></>} />

          
          
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
