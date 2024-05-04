import React, { useState, useEffect } from 'react';
import BackButton from '../SellInstrument/BackButton1';
import Spinner from './Spinner1';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditItem = () => {
  const [title, setTitle] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [bank, setBank] = useState('');
  const [accno, setAccno] = useState('');
  const [accname, setAccname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [orderstatus, setOrderStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5050/sellItem/${id}`)
      .then((response) => {
        setCondition(response.data.condition);
      setPrice(response.data.price)
        setTitle(response.data.title)
        setType(response.data.type)
        setColor(response.data.color)
        setBrand(response.data.brand)
        setDescription(response.data.description)
        setQuantity(response.data.quantity)
        setBank(response.data.bank)
        setAccno(response.data.accno)
        setAccname(response.data.accname)
        setName(response.data.name)
        setEmail(response.data.email)
        setPhoneno(response.data.phoneno)
        setOrderStatus(response.data.orderstatus);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error happened. Please check console', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditItem  = () => {
    const data = {
      title,
      condition,
      price,
      type,
      color,
      brand,
      description,
      quantity,
      bank,
      accno, 
      accname,
      name,
      email,
      phoneno,
      orderstatus,
    };
    setLoading(true);
    axios
    .put(`http://localhost:5050/sellItem/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Item Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error happened. Please check console', { variant: 'error' });
        console.log(error);
      });
  };

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  return (
    <>
    
    <div style={{ 
      backgroundImage: "url(https://images.unsplash.com/photo-1512053459797-38c3a066cabd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8aW5zdHJ1bWVudHN8fDB8fHx8MTYyNzA5MTI2Mg&ixlib=rb-1.2.1&q=80&w=1080)", 
      backgroundSize: 'cover', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>

         <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '4rem', padding: '1rem' }}>
         <BackButton />
        <h1 className='text-3xl font-bold mb-6' style={{ color: '#fff' }}>Edit Request</h1>
        {loading && <Spinner />}
      
        
        <div className='max-w-2xl mx-auto' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
        <div className='my-4'>
          <label className='text-xl text-gray-700 mb-2 block'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
            disabled // Adding the disabled attribute here
          />
        </div>

          
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Condition</label>
            <input
              type='text'
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
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
            <label className='text-xl text-gray-700 mb-2 block'>Type</label>
            <input
              type='text'
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
          </div>

          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Color</label>
            <input
              type='text'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Brand</label>
            <input
              type='text'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400' 
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Description</label>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Quantity</label>
            <input
              type='text'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'
              disabled
            />
            <div className='my-4'>
            <label className='text-xl text-gray-700 mb-2 block'>Order Status</label>
            <select value={orderstatus} onChange={handleStatusChange} className='border-2 border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-400'>
             
        <option value="Pending">Pending</option>
        <option value="Accepted">Accept</option>
        <option value="Rejected">Reject</option>
      </select>
          </div>
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
            onClick={handleEditItem}
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
    </>
  );
};

export default EditItem;