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

<div class="grid h-screen bg-white-800 lg:grid-cols-1 justify-center">
  <div></div>
  <div class="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-black shadow-md">


    <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
      <img class="peer absolute top-0 right-0 h-full w-full object-cover" src="https://www.musicgrotto.com/wp-content/uploads/2021/03/up-close-fingerstyle-guitar-playing.png" alt="product image" />
      <img class="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src="https://strummingly.com/wp-content/uploads/2020/12/left-handed-guitar-player.jpg" alt="product image" />
      <svg class="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
      <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-5 text-center text-sm font-medium text-white">{request.issueType}</span>
      
    </a>
    <div class="mt-4 px-5 pb-5">
      <a href="#">
      <div className='flex justify-start items-center gap-x-2'>
         <BiUserCircle className='text-orange-600 text-2xl' />
        <h4 className='my-1'>{request.email}</h4>
       </div>
    
      <div className='flex justify-start items-center gap-x-2'>
        <FaMusic className='text-orange-600 text-2xl' />
        <h4 className='my-1'>{request.instrumentCat}</h4>
      </div>

      <div className='flex justify-start items-center gap-x-2'>
         <GiGuitar className='text-orange-600 text-2xl' /> {/* Use GiGuitar icon */}
         <h4 className='my-1'>{request.instrumentBrand}</h4>
       </div>

       <div className='flex justify-start items-center gap-x-2'>
       <FaDollarSign className='text-orange-600 text-2xl' /> {/* Use GiGuitar icon */}
        <h4 className='my-1'>Rs.{request.price}.00</h4>
      </div>
      
      {/* <button
  className="flex justify-start items-center gap-x-2 bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
  onClick={() => {
        // Handle button click event
  }}
 >
  
   <h5 className='my-1'>{request.status}</h5>
 </button> */}

<br></br>
<div className='flex justify-between items-center gap-x-2 '>
<button
    className="flex justify-start items-center gap-x-2 bg-orange-600  text-white font-bold py-2 px-4 rounded"
    onClick={() => {
          // Handle button click event
    }}
  >
    <h5 className='my-1'>{request.status}</h5>
  </button>
  {<BiShow
    className='text-3xl text-orange-600 hover:text-orange-900 cursor-pointer'
    onClick={() => setShowModal(true)}
  /> }
  
     {showModal && (
        <RequestModal request={request} onClose={() => setShowModal(false)} />
      )}
        
  {/* Button and Status */}

</div>

  </a>
  <br></br>
      
  <Link
  to="/payment" 
  className="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
>
  Upload slip
</Link>

    </div>
  </div>
</div>

   
  );
};

export default RequestSingleCard;