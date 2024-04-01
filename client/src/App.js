import './App.css';
import TopNav from './components/topNav';
import Footer from './components/Footer';
import RentHome from './components/Rental/RentHomePage';

function App() {
  return (
    <div className="App">
      <TopNav/>
      <RentHome/>
      <Footer/>
    </div>
  );
}

export default App;
