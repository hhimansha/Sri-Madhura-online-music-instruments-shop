import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner1';
import { Link } from 'react-router-dom';
import ItemCard from '../SellInstrument/home/ItemCard';

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
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Selling Instruments Dashboard</h1>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <ItemCard sellitems={sellItem} />
        )}
      </div>
    </>
  );
};

export default Home;
