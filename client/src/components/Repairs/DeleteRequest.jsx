import React, { useState } from 'react';
import BackButton from '../Repairs/BackButton';
import Spinner from '../Repairs/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const DeleteRequest = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRequest = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5050/repair/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Request Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div style={{ 
      backgroundImage: "url('/images/repairB4.jpeg')", 
      backgroundSize: 'cover', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl font-bold mb-6' style={{ color: '#fff' }}>Delete Request</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col items-center rounded-xl w-[600px] p-8 mx-auto' style={{ background: 'white' }}>
          <h3 className='text-2xl text-black mb-8'>Are you sure you want to delete this book?</h3>
          <button className='p-4 bg-red-600 text-white w-full' onClick={handleDeleteRequest}>
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRequest;
