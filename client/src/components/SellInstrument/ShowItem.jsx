import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../SellInstrument/BackButton1';
import Spinner from './Spinner1';

const ShowItem = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5050/sellItem/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl mt-4 mb-1'>Show Sell Item Instrument Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col lg:flex-row justify-between'>
          {/* Instrument Details */}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full lg:w-1/3 p-4 mr-4 mb-4 lg:mb-0'>
            <h2 className='text-xl font-bold mb-4'>Instrument Details</h2>
            <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Id</span>
            <span className='text-xl mr-4 text-gray-700'>{item._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Instrument</span>
            <span className='text-xl mr-4 text-gray-700'>{item.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Condition</span>
            <span className='text-xl mr-4 text-gray-700'>{item.condition}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Price</span>
            <span className='text-xl mr-4 text-gray-700'>{item.price}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Type</span>
            <span className='text-xl mr-4 text-gray-700'>{item.type}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Color</span>
            <span className='text-xl mr-4 text-gray-700'>{item.color}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Brand</span>
            <span className='text-xl mr-4 text-gray-700'>{item.brand}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Description</span>
            <span className='text-xl mr-4 text-gray-700'>{item.description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Quantity</span>
            <span className='text-xl mr-4 text-gray-700'>{item.quantity}</span>
          </div>
          
          </div>

          {/* Bank Details */}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full lg:w-1/3 p-4 mr-4 mb-4 lg:mb-0'>
            <h2 className='text-xl font-bold mb-4'>Bank Details</h2>
            <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Bank</span>
            <span className='text-xl mr-4 text-gray-700'>{item.bank}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Acc No</span>
            <span className='text-xl mr-4 text-gray-700'>{item.accno}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Acc Name</span>
            <span className='text-xl mr-4 text-gray-700'>{item.accname}</span>
          </div>
          </div>

          {/* Personal Details */}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full lg:w-1/3 p-4'>
            <h2 className='text-xl font-bold mb-4'>Personal Details</h2>
            <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Name</span>
            <span className='text-xl mr-4 text-gray-700'>{item.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Email</span>
            <span className='text-xl mr-4 text-gray-700'>{item.email}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Phone No</span>
            <span className='text-xl mr-4 text-gray-700'>{item.phoneno}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Create Time</span>
            <span className='text-xl mr-4 text-gray-700'>{new Date(item.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Last Update Time</span>
            <span className='text-xl mr-4 text-gray-700'>{new Date(item.updatedAt).toString()}</span>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowItem;
