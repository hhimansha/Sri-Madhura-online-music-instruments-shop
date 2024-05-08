import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs'; // Correct import
import { MdDelete } from 'react-icons/md'; // Correct import
import { useState } from 'react';

const ItemSingleCard = ({ sellItem }) => {
  return (
    <>
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        {/* Item details */}
        <div className="text-lg text-gray-900 md:text-xl dark:text-white">
          <h3 className="font-semibold">{sellItem.title}</h3>
          <p className="font-bold">{sellItem.price}</p>
          <p className="font-bold">{sellItem.condition}</p>
          <p className="font-bold">{sellItem.type}</p>
          <p className="font-bold">{sellItem.color}</p>
          <p className="font-bold">{sellItem.brand}</p>
          <p className="font-bold">{sellItem.quantity}</p>
          <p className="font-bold">{sellItem.orderstatus}</p>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to={`/sellItem/details/${sellItem._id}`}>
              <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
            </Link>
            <Link to={`/sellItem/delete/${sellItem._id}`}>
              <MdDelete className="text-2xl text-red-600 hover:text-black" /> {/* Changed to MdDelete */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemSingleCard;
