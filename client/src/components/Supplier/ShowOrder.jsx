import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../Supplier/BackButton2';
import Spinner from '../Supplier/Spinner2';

const ShowOrder = () => {
  const [suprequest, setSupRequest] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5050/suprequest/${id}`)
      .then((response) => {
        setSupRequest(response.data);
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
      <h1 className='text-3xl mt-4 mb-1'>Show Supplier Instruments Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex items-center justify-center h-screen mt-4 mb-1'>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Id</span>
            <span className='text-xl mr-4 text-gray-700'>{suprequest._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Instrument</span>
            <span className='text-xl mr-4 text-gray-700'>{suprequest.instrument}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Type</span>
            <span className='text-xl mr-4 text-gray-700'>{suprequest.type}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Brand</span>
            <span className='text-xl mr-4 text-gray-700'>{suprequest.brand}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Quantity</span>
            <span className='text-xl mr-4 text-gray-700'>{suprequest.quantity}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Create Time</span>
            <span className='text-xl mr-4 text-gray-700'>{new Date(suprequest.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-black-900'>Last Update Time</span>
            <span className='text-xl mr-4 text-gray-700'>{new Date(suprequest.updatedAt).toString()}</span>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default ShowOrder;