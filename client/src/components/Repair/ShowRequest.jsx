import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowRequest = () => {
  const [request, setRequest] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5050/repair/${id}`)
      .then((response) => {
        setRequest(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
      backgroundImage: "url('/images/repairB4.jpeg')", 
      backgroundSize: 'cover', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px' // Added padding to center content within the background
    }}>
      <div className='max-w-2xl mx-auto' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
        <BackButton />
        <h1 className='text-3xl font-bold mb-6' style={{ color: '#000' }}>Show Request</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Id:</span>
              <span>{request._id}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Name:</span>
              <span>{request.name}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Email:</span>
              <span>{request.email}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Address:</span>
              <span>{request.address}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Date:</span>
              <span>{request.date}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Instrument:</span>
              <span>{request.instrumentCat}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Instrument Category:</span>
              <span>{request.instrumentBrand}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Instrument Brand:</span>
              <span>{request.brand}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Warranty:</span>
              <span>{request.warranty}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Issue Type:</span>
              <span>{request.issueType}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Issue Description:</span>
              <span>{request.issueDescription}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Create Time:</span>
              <span>{new Date(request.createdAt).toString()}</span>
            </div>
            <div className='mb-4'>
              <span className='text-gray-700 font-bold mr-4'>Last Update Time:</span>
              <span>{new Date(request.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowRequest;
