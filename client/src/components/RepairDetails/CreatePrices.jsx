import React, { useState } from 'react';
import Back from '../RepairDetails/Back';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaGuitar, FaTools, FaDollarSign, FaStickyNote } from 'react-icons/fa';


const CreatePrices = () => {
    const [issueType2, setIssueType2] = useState('');
    const [fprice, setFprice] = useState('');
    const [issueDetail, setIssueDetail] = useState('');
    const [Ninstrument, setNInstrument] = useState('');
    const [Rimage, setRImage] = useState(null); // State to hold the image file
    const [RimageBase64, setRimageBase64] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSavePrice = async () => {
        try {
            const formData = new FormData();
            formData.append('issueType2', issueType2);
            formData.append('fprice', fprice);
            formData.append('Ninstrument', Ninstrument);
            formData.append('issueDetail', issueDetail);
            formData.append('Rimage', Rimage);
            formData.append('filebase64', RimageBase64); // Append the image to the FormData

            setLoading(true);
            const response = await axios.post('http://localhost:5050/prices', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
                },
            });
            setLoading(false);
            enqueueSnackbar('Price Created successfully', { variant: 'success' });
            navigate('/');
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Error', { variant: 'error' });
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setRImage(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {setRimageBase64(reader.result);
        };
    };
        // ; // Update Rimage state variable

    
    
    return (
        <div style={{ 
            backgroundImage: "url('../images/repairB4.jpeg')", 
            backgroundSize: 'cover', 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
        <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '4rem', padding: '1rem' }}>
        <Back />
        <h1 className='text-3xl font-bold mb-6' style={{ color: '#fff' }}>Add Price</h1>
            
            <div style={{ background: '#f9f9f9', width: '600px', padding: '2rem', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaGuitar style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              <input
                id='Ninstrument'
                type='text'
                value={Ninstrument}
                onChange={(e) => setNInstrument(e.target.value)}
                style={{ border: 'none', padding: '0.5rem', flex: '1', fontSize: '1rem' }}
                placeholder='Instrument'
              />
            </div>
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaTools style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              <input
                id='issueType2'
                type='text' 
                value={issueType2}
                onChange={(e) => setIssueType2(e.target.value)}
                style={{ border: 'none', padding: '0.5rem', flex: '1', fontSize: '1rem' }}
                placeholder='Issue Type'
              />
            </div>
                <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaDollarSign style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              <input
                id='fprice'
                type='string'
                placeholder='Price'
                value={fprice}
                onChange={(e) => setFprice(e.target.value)}
                style={{ border: 'none', padding: '0.5rem', flex: '1', fontSize: '1rem' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaStickyNote style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              <input
                id='issueDetail'
                type='text'
                value={issueDetail}
                onChange={(e) => setIssueDetail(e.target.value)}
                style={{ border: 'none', padding: '0.5rem', flex: '1', fontSize: '1rem' }}
                placeholder='Issue Details'
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Upload Image</label>
              <input type='file' onChange={handleImageChange} accept='image/*' style={{ padding: '0.5rem', fontSize: '1rem' }} />
           
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
                position: 'relative', // Required for the animation
                overflow: 'hidden', // Required for the animation
              }}
              onClick={handleSavePrice}
              onMouseDown={(e) => {
                // Expand the button when clicked
                e.target.style.transform = 'scale(0.95)';
                e.target.style.backgroundColor = '#2980b9';
              }}
              onMouseUp={(e) => {
                // Restore the button to its original size after releasing the click
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = '#3498db';
              }}
            >
              Save
            </button>
            {/* <button className='p-2 bg-sky-300 m-8' onClick={handleSavePrice}>
                Save
            </button> */}
            </form>
            </div>
        </div>
        </div>
        
    );
};

export default CreatePrices;
