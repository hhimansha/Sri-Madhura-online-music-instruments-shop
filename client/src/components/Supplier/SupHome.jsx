import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Supplier/Spinner2';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import OrderTable from './home/OrderTable';
import OrderCard from './home/OrderCard';
import TopNav from '../topNav';
import Footer from '../Footer';


const Home = () => {
  const [suprequest, setSupRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5050/suprequest')
      .then((response) => {
        setSupRequest(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <TopNav/>
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-orange-500 hover:bg-orange-700 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Admin
        </button>

        
        
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Order List</h1>
        <Link to='/suprequest/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <OrderTable suprequests={suprequest} />
      ) : (
        <OrderCard suprequests={suprequest} />
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Home;