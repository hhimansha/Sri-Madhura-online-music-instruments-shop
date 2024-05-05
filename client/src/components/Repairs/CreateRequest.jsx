import React, { useState } from 'react';
import BackButton from '../Repairs/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaGuitar } from 'react-icons/fa';
import { MdMusicNote } from 'react-icons/md';
import { FaStickyNote } from 'react-icons/fa';
import { FaDrum } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa';
import { FaCheck} from 'react-icons/fa';
import {  FaDollarSign } from 'react-icons/fa';


const CreateRequest = () => {
  // const [cID, setcID] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [instrumentCat, setInstrumentCat] = useState('');
  const [instrumentBrand, setInstrumentBrand] = useState('');
  const [brand, setBrand] = useState(''); // Added brand state
  const [warranty, setWarranty] = useState('');
  const [issueType, setIssueType] = useState('');
  const [price, setPrice] = useState(0);
  const [issueDescription, setIssueDescription] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const instrumentCategories = {
    Violin: ["Violin", "Viola", "Cello", "Double Bass"],
    Guitar: ["Electric", "Acoustic", "Bass"],
    Drums: ["Side", "Bass"],
    Melodica: ["key 32","key 37"],
    Organs:["Casio SA-45","Casio SA-76"],
    Trumphet:["Suzuki"],
    CahonaBox: ["x"],
    MouthOrgan:["Yamaha"],

  };
  const issuePrices = {
    'String Replacement': 200,
    'Drumhead Replacement': 1500,
    'Drum Shell Repair': 1200,
    'Tuning Peg Replacement': 500,
    'Pickup Replacement': 750,
    'Key Replacement': 950,
    'Tuning': 650,
  };

  const handleSaveRequest = () => {
    const data = {
      // cID,
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
      status
    };
    setLoading(true);
    axios
      .post(`http://localhost:5050/repair`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Request created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const handleInstrumentCatChange = (e) => {
    setInstrumentCat(e.target.value);
  };
  const handleIssueTypeChange = (selectedIssueType) => {
    setIssueType(selectedIssueType);
    setPrice(issuePrices[selectedIssueType] || 0);
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
        <h1 className='text-3xl font-bold mb-6' style={{ color: '#fff' }}>Add Request</h1>
        
        
        <div style={{ background: '#f9f9f9', width: '500px', padding: '2rem', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
        
        
       <FaUser style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              
<input
    type="text"
    name="name"
    id="name" // Unique id for the input field
    onChange={(e) => setName(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    placeholder="Customer Name"
    required
  />
  </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaEnvelope style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              
               <input
    type="email"
    value={email}
    id="email" 
    onChange={(e) => setEmail(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    placeholder="Email"
    required
  />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaMapMarkerAlt style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
             
                <input
    type="text"
    value={address}
    id="address" 
    onChange={(e) => setAddress(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    placeholder="Address"
    required
  />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaCalendarAlt style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
             
              
                <input
    type="date"
    value={date}
    id="date" 
    onChange={(e) => setDate(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    placeholder="Date"
    required
  />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaGuitar style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              <select
                id='instrumentCat'
                placeholder='Instrument Category'
                value={instrumentCat}
                onChange={handleInstrumentCatChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value=''>Select Instrument</option>
                {Object.keys(instrumentCategories).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {(instrumentCat === 'Violin' || instrumentCat === 'Guitar' || instrumentCat === 'Drums'|| instrumentCat === 'Melodica'|| instrumentCat === 'Organs'|| instrumentCat === 'Trumphet'|| instrumentCat === 'CahonBox'|| instrumentCat === 'MouthOrgan') && (
              <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
                < FaDrum style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
                <select
                  id='instrumentBrand'
                  value={instrumentBrand}
                  onChange={(e) => setInstrumentBrand(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value=''>Select {instrumentCat} Category</option>
                  {instrumentCategories[instrumentCat].map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <MdMusicNote style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              <select
                id='brand'
                type='text' 
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder='Brand'>
                <option value=''>Select Brand</option>
                <option value='Lark'>Lark</option>
                <option value='Cremona'>Cremona</option>
                <option value='Yamaha'>Yamaha</option>
                <option value='Suzuki'>Suzuki</option>
                <option value='Yamaha'>Yamaha</option>
                <option value='Yamaha'>Yamaha</option>

                </select>
              
            </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaShieldAlt  style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              <select
                id='warranty'
                placeholder='Warranty'
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value=''>Select Warranty</option>
                <option value='Have'>Have</option>
                <option value='Not Have'>Not Have</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaTools  style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              <select
                id='issueType'
                placeholder='Issue Type'
                value={issueType}
                onChange={(e) => handleIssueTypeChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value=''>Select Issue</option>
                <option value='String Replacement'>String Replacement</option>
                <option value='Drumhead Replacement'>Drumhead Replacement</option>
                <option value='Drum Shell Repair'>Drum Shell Repair</option>
                <option value='Tuning Peg Replacement'>Tuning Peg Replacement</option>
                <option value='Pickup Replacement'>Pickup Replacement</option>
                <option value='Key Replacement'>Key Replacement</option>
                <option value='Tunning'>Tunning</option>
              </select>
            </div>

  
  <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaDollarSign style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
          
          <input
          value = {price}
          placeholder='price'
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>

      
    
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
  <FaStickyNote style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
  <textarea
    id='issueDescription'
    value={issueDescription}
    onChange={(e) => setIssueDescription(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    placeholder='Issue Description'
  />
</div>

            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <FaCheck  style={{ color: '#333', marginRight: '0.5rem', fontSize: '1.5rem' }} />
              <select
                id='status'
                placeholder='Status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value=''>Select Status</option>
                <option value='Pending'>Pending</option>
                <option value='Completed'>Completed</option>
                <option value='Not Completed'>Not Completed</option>
              </select>
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
              }}
              onClick={handleSaveRequest}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
