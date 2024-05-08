import React, { useState } from 'react';
import BackButton from '../SellInstrument/BackButton1';
import Spinner from './Spinner1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const CreateItem = () => {
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
  const [orderstatus, setOrderStatus] = useState('pending');
  const [Simage, setSImage] = useState(null); // State to hold the image file
  const [SimageBase64, setSimageBase64] = useState(null);
  const [isValid, setIsValid] = useState(true); // State to track email validity
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveItem = () => {
    const formData = new FormData(); // Create FormData object to append file data
    formData.append('title', title);
    formData.append('condition', condition);
    formData.append('price', price);
    formData.append('type', type);
    formData.append('color', color);
    formData.append('brand', brand);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('bank', bank);
    formData.append('accno', accno);
    formData.append('accname', accname);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneno', phoneno);
    formData.append('orderstatus', orderstatus);
    formData.append('Simage', Simage); // Append image file to FormData
    formData.append('filebase64', SimageBase64); 

    setLoading(true);
    axios
      .post('http://localhost:5050/sellItem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type as multipart/form-data for file upload
        }
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Item Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  const handleImageChanges = (e) => {
    const file = e.target.files[0];
    setSImage(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {setSimageBase64(reader.result);
    };
};


  const instrumentTypes = {
    Violin: ["Violin", "Viola", "Cello", "Double Bass"],
    Guitar: ["Electric", "Acoustic", "Bass"],
    Drums: ["Side", "Bass"],
    // Add more instruments and types as needed
  };

  // Function to handle instrument change
  const handleInstrumentChange = (e) => {
    const selectedInstrument = e.target.value;
    setTitle(selectedInstrument);
    setType(''); // Reset type when instrument changes
  };

  // Function to handle type change
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(inputEmail);
    setIsValid(isValidEmail);
  };

  // Function to handle phone number change and validation
  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    setPhoneno(inputPhone);

    // Regular expression to validate phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    const isValidPhone = phoneRegex.test(inputPhone);
    setIsValidPhone(isValidPhone);
  };

 

  // Function to populate models based on selected instrument
  const populateModels = () => {
    const selectedInstrument = title;
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
  }
  


  return (
    <>
    
    <link rel="stylesheet" type="text/css" href="../styles/index.css"/>
  
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap"
    rel="stylesheet"
  />

<BackButton />
{loading ? <Spinner /> : ''}
<h2>Complete your listing</h2>
<div className="container">
    <form id="survey-form" method="GET">
      <h3>Instrument details: </h3>
      <div className="labels">
        <label htmlFor="instrument">Select an Instrument:</label>
      </div>
      <div className="input-tab">
        <select id ="title" name="title"
          className="input-field"
          value={title}
          onChange={handleInstrumentChange}
          required=""
          autoFocus=""
        >
          <option value="" disabled>Select an option</option>
          <option value="Violin">Violin</option>
          <option value="Guitar">Guitar</option>
          <option value="Drums">Drums</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="labels">
        <label htmlFor="type">Type:</label>
      </div>
      <div className="input-tab">
        <select id="type" name="type"
          className="input-field"
          value={type}
          onChange={handleTypeChange}
          disabled={!title} // Disable type select until an instrument is selected
          required=""
          autoFocus=""
        >
          <option value="" disabled>Select a type</option>
          {title && instrumentTypes[title].map((typeOption) => (
            <option key={typeOption} value={typeOption}>{typeOption}</option>
          ))}
        </select>
      </div>

      <br />

      <div>
      <div className="labels">
        <label htmlFor="condition">Condition:</label>
      </div>
      <div className="input-tab">
        <select
          id="condition"
          name="condition"
          className="input-field"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required=""
          autoFocus=""
        >
          <option value="" disabled>Select condition</option>
          <option value="Branded">Branded</option>
          <option value="Used">Used</option>
          <option value="Unboxed">Unboxed</option>
          <option value="Broken">Broken</option>
        </select>
      </div>
    </div>

      <div className="labels">
        <label>Color:</label>
      </div>
      <div className="input-tab">
      <input
      className="input-field"
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
          required=""
          autoFocus=""
          />
      </div>

      <br />
      <div className="labels">
        <label>Brand:</label>
      </div>
      <div className="input-tab">
      <input
      className="input-field"
            type='text'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
          required=""
          autoFocus=""
          />
      </div>

      <br />
      <div className="labels">
        <label>Description:</label>
      </div>
      <div className="input-tab">
      <input
      className="input-field"
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          required=""
          autoFocus=""
          />
      </div>
</form>
</div>
<br /><br />
<div className="container">
<form id="survey-form" method="GET">
<h3>Price: </h3>
      <div className="labels">
        <label>Price:</label>
      </div>
      <div className="input-tab">
      <input
      className="input-field"
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price"
          required=""
          autoFocus=""
          />
      </div>

      <br />
      <div className="labels">
        <label htmlFor="quantity">Quantity:</label>
      </div>
      <div className="input-tab">
        <select
          id="quantity"
          name="quantity"
          className="input-field"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required=""
          autoFocus=""
        >
          <option value="" disabled>Select quantity</option>
          {[1, 2, 3, 4, 5].map((number) => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
      </div>
</form>
</div>
<br /><br />


<div className="container">
<form id="survey-form" method="GET">
  <h3>Bank Details: </h3>
      <div className="labels">
        <label>Bank:</label>
      </div>
      <div className="input-tab">
      <input
      className="input-field"
            type='text'
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            placeholder="bank"
          required=""
          autoFocus=""
          />
      </div>

      <br />
      <div className="labels">
        <label>Acc no:</label>
      </div>
      <div className="input-tab">
      <input
      className="input-field"
            type='text'
            value={accno}
            onChange={(e) => setAccno(e.target.value)}
            placeholder="acc no"
          required=""
          autoFocus=""
          />
      </div>

      <br />
      <div className="labels">
        <label>Acc name:</label>
      </div>
      <div className="input-tab">
      <input
      className="input-field"
            type='text'
            value={accname}
            onChange={(e) => setAccname(e.target.value)}
            placeholder="Acc name"
          required=""
          autoFocus=""
          />
      </div>
  
</form>
</div>
<br /><br />


<div className="container">
<form id="survey-form" method="GET">
  <h3>Personal Details: </h3>
      <div className="labels">
        <label>Name:</label>
      </div>
      <div className="input-tab">
      <input
      className="input-field"
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          required=""
          autoFocus=""
          />
      </div>

      <br />
      <div className="labels">
              <label>Email:</label>
            </div>
            <div className="input-tab">
              <input
                className="input-field"
                type="text"
                value={email}
                onChange={handleEmailChange} // Call the validation function on input change
                name="email"
                placeholder="Email"
              />
               {!isValid && <p className="text-red-500 text-sm">Please enter a valid email address.</p>}
            </div>

      <br />
      <div className="labels">
        <label>Phone no:</label>
      </div>
      <div className="input-tab">
        <input
          className={`input-field ${!isValidPhone ? 'invalid' : ''}`}
          type="text"
          value={phoneno}
          onChange={handlePhoneChange} // Call the validation function on input change
          placeholder="Phone no"
        />
        {!isValidPhone && <p className="text-red-500 text-sm">Please enter a valid phone number (10 digits).</p>}
      </div>

            

      <br />

   
      <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Upload Image</label>
              <input type='file' onChange={handleImageChanges} accept='image/*' style={{ padding: '0.5rem', fontSize: '1rem' }} />
           
</div>
          

      
      <br />
      <div className="btn">
  <button id="submit" type="submit"   onClick={()=>{handleSaveItem(); window.location.href='/sellItem/sellitemhome';}}>
    Save
  </button>
</div>

    </form>
  </div>
    </>
  );
}

export default CreateItem

