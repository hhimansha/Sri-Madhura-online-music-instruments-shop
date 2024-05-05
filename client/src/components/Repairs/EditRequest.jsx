import React, { useState, useEffect } from 'react';
import BackButton from '../Repairs/BackButton';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaGuitar, FaStickyNote } from 'react-icons/fa';

const EditRequest = () => {
  const [cID, setcID] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [instrumentCat, setInstrumentCat] = useState('');
  const [instrumentBrand, setInstrumentBrand] = useState('');
  const [brand, setBrand] = useState('');
  const [warranty, setWarranty] = useState('');
  const [issueType, setIssueType] = useState('');
  const [price, setPrice] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5050/repair/${id}`)
      .then((response) => {
        setcID(response.data.cID);
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        const fetchedDate = new Date(response.data.date);
        const formattedDate = fetchedDate.toISOString().split('T')[0];
        setDate(formattedDate);
        setInstrumentCat(response.data.instrumentCat);
        setInstrumentBrand(response.data.instrumentBrand);
        setBrand(response.data.brand);
        setWarranty(response.data.warranty);
        setIssueType(response.data.issueType);
        setPrice(response.data.price);
        setIssueDescription(response.data.issueDescription);
        setStatus(response.data.status);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error happened. Please check console', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const instrumentCategories = {
    Violin: ["Violin", "Viola", "Cello", "Double Bass"],
    Guitar: ["Electric", "Acoustic", "Bass"],
    Drums: ["Side", "Bass"],
  };

  const handleEditRequest = () => {
    const data = {
      cID,
      name,
      email,
      address,
      date,
      instrumentCat,
      instrumentBrand,
      brand,
      warranty,
      issueType,
      price,
      issueDescription,
      status,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5050/repair/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Request Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error happened. Please check console', { variant: 'error' });
        console.log(error);
      });
  };

  const handleInstrumentCatChange = (e) => {
    setInstrumentCat(e.target.value);
    setInstrumentBrand(''); // Reset instrumentBrand when instrumentCat changes
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
         <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '4rem', padding: '1rem' }}>
        <BackButton />
        <h1 className='text-3xl font-bold mb-6' style={{ color: '#fff' }}>Edit Request</h1>
       
        
        <div className='max-w-2xl mx-auto' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
       

          
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Customer Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Customer Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Customer Address</label>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Instrument</label>
            <select
              id='instrumentCat'
              value={instrumentCat}
              onChange={handleInstrumentCatChange}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            >
              <option value=''>Select Instrument</option>
              {Object.keys(instrumentCategories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {(instrumentCat === 'Violin' || instrumentCat === 'Guitar' || instrumentCat === 'Drums') && (
            <div className='my-4'>
              <label className='text-xl text-gray-700 mb-2 block'>{instrumentCat} Category</label>
              <select
                id='instrumentBrand'
                value={instrumentBrand}
                onChange={(e) => setInstrumentBrand(e.target.value)}
                className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
                disabled
              >
                <option value=''>Select {instrumentCat} Category</option>
                {instrumentCategories[instrumentCat].map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          )}
           <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Instrument Brand</label>
            <input
              type='text'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Warranty</label>
            <select
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            >
              <option value=''>Select Warranty</option>
              <option value='Have'>Have</option>
              <option value='Not Have'>Not Have</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Issue Type</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            >
               <option value=''>Select Issue</option>
                <option value='String Replacement'>String Replacement</option>
                <option value='wire'>wire</option>
                <option value='box'>box</option>
            </select>
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Price</label>
            <input
              type='text'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Issue Description</label>
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              rows={4} 
              placeholder='Enter issue description...'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
            >
               <option value=''>Select Status</option>
                <option value='Pending'>Pending</option>
                <option value='Completed'>Completed</option>
                <option value='50% Completed'>50% Completed</option>
                <option value='75% Completed'>75% Completed</option>
                <option value='Not Completed'></option>
            </select>
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Date</label>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
          </div>
          <button
            type='button'
            style={{
              backgroundColor: '#3498db',
              color: '#fff',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              border: 'none',
              outline: 'none',
              position: 'relative',
              overflow: 'hidden',
              width: '520px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={handleEditRequest}
            onMouseDown={(e) => {
              e.target.style.transform = 'scale(0.95)';
              e.target.style.backgroundColor = '#2980b9';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.backgroundColor = '#3498db';
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRequest;
