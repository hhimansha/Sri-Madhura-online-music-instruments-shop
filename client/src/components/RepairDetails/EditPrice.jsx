
import React, { useState, useEffect } from 'react';
import Back from '../RepairDetails/Back';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditPrice = () => {
  const [issueType2, setIssueType2] = useState('');
  const [fprice, setFprice] = useState('');
  const [Ninstrument, setNInstrument] = useState('');
  const [issueDetail, setIssueDetail] = useState('');
  const [Rimage, setRImage] = useState(null); // State to hold the image file
  const [RimageBase64, setRimageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5050/prices/${id}`)
      .then((response) => {
        setNInstrument(response.data.Ninstrument);
        setIssueType2(response.data.issueType2);
        setFprice(response.data.fprice);
        setIssueDetail(response.data.issueDetail);
        setRimageBase64(response.data.RimageBase64);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, []);

  const handleEditPrice = () => {
    const data = {
      Ninstrument,
      issueType2,
      fprice,
      issueDetail,
      Rimage,
      RimageBase64, // Append the image to the FormData
    };
    setLoading(true);
    axios
      .put(`http://localhost:5050/prices/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Detail Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRImage(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setRimageBase64(reader.result);
    };
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
        <Back />
        <h1 className='text-3xl font-bold mb-6' style={{ color: '#fff' }}>Edit Request</h1>
        
        <div className='max-w-2xl mx-auto' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
        <div className='my-4'>
          <label className='text-xl text-gray-700 mb-2 block'>Instrument </label>
          <input
            type='text'
            value={Ninstrument}
            onChange={(e) => setNInstrument(e.target.value)}
            className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
            
          />
        </div>
 
      <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Issue Type</label>
            <input
              type='text'
              value={issueType2}
              onChange={(e) => setIssueType2(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              
            />
          </div>



<div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Price</label>
            <input
              type='text'
              value={fprice}
              onChange={(e) => setFprice(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
            
            />
          </div>

 
 <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Issue Details</label>
            <input
              type='text'
              value={issueDetail}
              onChange={(e) => setIssueDetail(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              
            />
          </div>
        
        <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Image</label>
            <input
              type='file'
              onChange={handleImageChange} 
              accept='image/*' 
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
            />
          </div>
     
          {RimageBase64 && (
            <img src={RimageBase64} className='mt-4 h-40 w-auto object-cover' alt='Price Image' />
          )}
        
        <br></br>
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
            onClick={() => {
              handleEditPrice();
              window.location.href = '/prices/DetailsHome';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'scale(0.95)';
              e.target.style.backgroundColor = '#2980b9';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.backgroundColor = '#3498db';
            }}
          >
            Save
          </button>
        </div>
       
      </div>
    
      </div>
    
  );
};

export default EditPrice;
