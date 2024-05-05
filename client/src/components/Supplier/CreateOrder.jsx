import React, { useState } from 'react';
import BackButton from '../Supplier/BackButton2';
import Spinner from '../Supplier/Spinner2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateOrders = () => {
  const [instrument, setInstrument] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const instrumentTypes = {
    Violin: ["Violin", "Viola", "Cello", "Double Bass"],
    Guitar: ["Electric", "Acoustic", "Bass"],
    Drums: ["Side", "Bass"],
    // Add more instruments and types as needed
  };

  // Function to handle instrument change
  const handleInstrumentChange = (e) => {
    const selectedInstrument = e.target.value;
    setInstrument(selectedInstrument);
    setType(''); // Reset type when instrument changes
  };

  // Function to handle type change
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  // Function to populate models based on selected instrument
  const populateModels = () => {
    const selectedInstrument = instrument;
    const modelSelect = document.getElementById("type");
    modelSelect.innerHTML = ''; // Clear previous options

    if (selectedInstrument && instrumentTypes[selectedInstrument]) {
      const types = instrumentTypes[selectedInstrument];
      types.forEach(type => {
        const option = document.createElement("option");
        option.text = type;
        option.value = type;
        modelSelect.add(option);
      });
    }
  };

  const handleSaveOrder = () => {
    const data = {
      instrument,
      type,
      brand,
      quantity,
    };

    setLoading(true);
    axios
      .post('http://localhost:5050/suprequest', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Request Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Instrument</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
        <select
          id="instrument"
          name="instrument"
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={instrument}
          onChange={handleInstrumentChange}
          
          autoFocus=""
        >
          <option value="" disabled>Select an option</option>
          <option value="Violin">Violin</option>
          <option value="Guitar">Guitar</option>
          <option value="Drums">Drums</option>
          {/* Add more options as needed */}
        </select>
      </div>

      
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Type</label>
        <select
          id="type"
          name="type"
          className='border-2 border-gray-500 px-4 py-2  w-full '
          value={type}
          onChange={handleTypeChange}
          disabled={!instrument} // Disable type select until an instrument is selected
          
          autoFocus=""
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
          className='border-2 border-gray-500 px-4 py-2  w-full '
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Quantity</label>
        <input
          type='text'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2  w-full '
        />
      </div>
      <button className='p-2 bg-orange-500 m-8' onClick={handleSaveOrder}>
        Save
      </button>
    </div>
    </div>
  );
}

export default CreateOrders;
