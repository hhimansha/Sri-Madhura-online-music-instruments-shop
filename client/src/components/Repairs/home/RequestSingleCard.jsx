import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { GiGuitar } from 'react-icons/gi'; // Import GiGuitar icon
import { useState } from 'react';
import RequestModal from './RequestModal';
import {  FaDollarSign } from 'react-icons/fa';
import { FaMusic } from 'react-icons/fa';




const RequestSingleCard = ({ request }) => {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <div class="my-10 max-w-xs rounded-xl  relative hover:shadow-xl">
      
   
    <article class="">
      <a class="block rounded-lg bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400 p-2 " href="#">
      <h4 className='absolute top-1 right-2 px-4 py-1 bg-yellow-400 rounded-lg'>
        {request.issueType}
      </h4>
      <br></br>
      <h4 className='my-2 text-gray-500'>{request.cID}</h4>
     <br></br>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-yellow-400 text-2xl' />
        <h4 className='my-1'>{request.email}</h4>
      </div>
      <br></br>
      <div className='flex justify-start items-center gap-x-2'>
        <FaMusic className='text-yellow-400 text-2xl' />
        <h4 className='my-1'>{request.instrumentCat}</h4>
      </div>
      <br></br>
      <div className='flex justify-start items-center gap-x-2'>
        <GiGuitar className='text-yellow-400 text-2xl' /> {/* Use GiGuitar icon */}
        <h4 className='my-1'>{request.instrumentBrand}</h4>
      </div>
      <br></br>
      <div className='flex justify-start items-center gap-x-2'>
        <FaDollarSign className='text-yellow-400 text-2xl' /> {/* Use GiGuitar icon */}
        <h4 className='my-1'>{request.price}</h4>
      </div>
      <br></br>
      <button
  className="flex justify-start items-center gap-x-2 bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
  onClick={() => {
    // Handle button click event
  }}
>
  
  <h5 className='my-1'>{request.status}</h5>
</button>

      <br></br>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-red-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
       
        
      </div>
      {showModal && (
        <RequestModal request={request} onClose={() => setShowModal(false)} />
      )}
        
          
          
     
      </a>
    </article>
  

    
 
    </div>
   
  );
};

export default RequestSingleCard;