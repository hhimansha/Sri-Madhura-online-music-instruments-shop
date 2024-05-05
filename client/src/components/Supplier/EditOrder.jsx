import React, { useState, useEffect } from 'react';
import BackButton from '../Supplier/BackButton2';
import Spinner from '../Supplier/Spinner2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditOrder = () => {
  const [instrument, setInstrument] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const instrumentTypes = {
    Violin: ["Violin", "Viola", "Cello", "Double Bass"],
    Guitar: ["Electric", "Acoustic", "Bass"],
    Drums: ["Side", "Bass"],
    // Add more instruments and types as needed
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5050/suprequest/${id}`)
      .then((response) => {
        setInstrument(response.data.instrument);
        setQuantity(response.data.quantity);
        setType(response.data.type);
        setBrand(response.data.brand);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check console.', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditOrder = () => {
    const data = {
      instrument,
      type,
      brand,
      quantity,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5050/suprequest/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Order Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleInstrumentChange = (e) => {
    const selectedInstrument = e.target.value;
    setInstrument(selectedInstrument);
    setType(''); // Reset type when instrument changes
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Order</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Instrument</label>
          <select
            id="instrument"
            name="instrument"
            className='border-2 border-gray-500 px-4 py-2 w-full'
            value={instrument}
            onChange={handleInstrumentChange}
            required
          >
            <option value="" disabled>Select an option</option>
            {Object.keys(instrumentTypes).map((instrumentOption) => (
              <option key={instrumentOption} value={instrumentOption}>{instrumentOption}</option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Type</label>
          <select
            id="type"
            name="type"
            className='border-2 border-gray-500 px-4 py-2 w-full'
            value={type}
            onChange={handleTypeChange}
            required
            disabled={!instrument}
          >
            <option value="" disabled>Select a type</option>
            {instrument && instrumentTypes[instrument].map((typeOption) => (
              <option key={typeOption} value={typeOption}>{typeOption}</option>
            ))}
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Brand</label>
          <input
            type='text'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='text'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-orange-500 m-8' onClick={handleEditOrder}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditOrder;
