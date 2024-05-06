import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { FiHeadphones } from 'react-icons/fi';
import { IoMusicalNotesOutline } from 'react-icons/io5';
import { GiMusicalScore, GiGuitar, GiViolin } from 'react-icons/gi';
import { FaGuitar, FaMusic } from 'react-icons/fa';
import { useState } from 'react';
import OrderModal from '../home/OrderModal';

const OrderSingleCard = ({ suprequest }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>

      <h4 className='my-2 text-gray-500'>{suprequest._id}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <GiMusicalScore className='text-red-300 text-2xl' />
        <h2 className='my-1'>{suprequest.instrument}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <IoMusicalNotesOutline className='text-red-300 text-2xl' />
        <h2 className='my-1'>{suprequest.type}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FiHeadphones className='text-red-300 text-2xl' />
        <h2 className='my-1'>{suprequest.brand}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <FaMusic className='text-red-300 text-2xl' />
        <h2 className='my-1'>{suprequest.quantity}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
       
        <Link to={`/suprequest/details/${suprequest._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/suprequest/edit/${suprequest._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/suprequest/delete/${suprequest._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <OrderModal suprequest={suprequest} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default OrderSingleCard;