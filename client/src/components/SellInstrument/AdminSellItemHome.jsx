import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../SellInstrument/Spinner1';
import ItemTable from './home/ItemTable';


const Home = () => {
  const [sellItem, setSellItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5050/sellItem')
      .then((response) => {
        setSellItem(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
          <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>Admin</button>
        </div>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Selling Instruments Dashboard</h1>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <ItemTable sellitems={sellItem} />
        )}
      </div>
    </>
  );
};

export default Home;
