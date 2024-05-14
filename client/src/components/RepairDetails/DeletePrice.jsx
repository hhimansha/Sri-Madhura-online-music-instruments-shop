import React, { useState } from 'react';
import Back from '../RepairDetails/Back';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const DeletePrice = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const{enqueueSnackbar} = useSnackbar();

  const handleDeletePrice = () => {
    setLoading(true);
    axios.delete(`http://localhost:5050/prices/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Details Deleted successfully', {variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please check console.');
        enqueueSnackbar('Error', {variant: 'error'});
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
        
        <h1 className='text-3xl bold  mb-6' style={{ color: '#fff' }}>Delete Price</h1>
        
        <div className='flex flex-col items-center rounded-xl w-[600px] p-8 mx-auto' style={{ background: 'white' }}>
          <h3 className='text-2xl text-black mb-8'>Are you sure you want to delete this price?</h3>
          <button className='p-4 bg-red-600 text-white w-full' 
            onClick={() => {
              handleDeletePrice();
              window.location.href = '/prices/DetailsHome';
            }}>
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePrice;
