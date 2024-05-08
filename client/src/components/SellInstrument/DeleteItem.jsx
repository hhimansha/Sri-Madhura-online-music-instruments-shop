import React, { useState } from 'react';
import BackButton from '../SellInstrument/BackButton1';
import Spinner from './Spinner1';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteItem = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteItem = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5050/sellItem/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Item Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Item</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this item?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={()=>{handleDeleteItem(); window.location.href='/sellItem/adminhome';}}

        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteItem;