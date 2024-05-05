import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';

import PriceModal from './PriceModal';

const PriceSingleCard = ({ price }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container bg-gray-200 p-4 rounded-lg">
      
      <h1 className="topic-heading">{price.Ninstrument}</h1>
      <div className="instrument-card w-85 mx-auto ml-4"> {/* Adjust the width and margin as needed */}
        <img className="instrument-image" src={price.RimageBase64} alt="Drums" />
        <div className="instrument-details">
          <h2>{price.issueType2}</h2>
          <p className="issue">{price.issueDetail}</p>
          <p className="price">{price.fprice}</p>
          <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
            <BiShow
              className='text-3xl text-blue-800 hover:text-black cursor-pointer'
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </div>
      {showModal && <PriceModal price={price} onClose={() => setShowModal(false)} />}
    </div>
  );
};  
export default PriceSingleCard;
