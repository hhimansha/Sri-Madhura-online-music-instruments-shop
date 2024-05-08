import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';


const ItemSingleCard = ({ sellItem }) => {
  

  return (
    <>
    
    <link rel="stylesheet" type="text/css" href="../styles/card.css"/>
    

    <div className='item-card-container'>
<div className='item-card'>
<p className='item-price text-lg font-bold text-gray-900 dark:text-gray-800'>Rs. {sellItem.price}</p>


 

  <div className='item-details'>
    <div>
      <h3>{sellItem.title}</h3>
    </div>
    <div>
      <p>Condition: {sellItem.condition}</p>
    </div>
    <div>
      <p>Type: {sellItem.type}</p>
    </div>
    <div>
      <p>Color: {sellItem.color}</p>
    </div>
    <div>
      <p>Brand: {sellItem.brand}</p>
    </div>
    <div>
      <p>Quantity: {sellItem.quantity}</p>
    </div>
    <div>
      <p>Order status: {sellItem.orderstatus}</p>
    </div>
    <div>
              {/* Assuming sellItem.SimageBase64 contains the image URL */}
              <img src={sellItem.SimageBase64} className='h-10 w-10 object-cover'  />
            </div>
   
    
    
  </div>
  <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
    
    <Link to={`/sellItem/details/${sellItem._id}`}>
      <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
    </Link>
    
    <Link to={`/sellItem/delete/${sellItem._id}`}>
      <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
    </Link>
  </div>
  
  </div>
</div>
</>
  );
};

export default ItemSingleCard;