import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const ItemTable = ({ sellitems }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sellitems based on searchQuery
  const filteredSellItems = sellitems.filter((sellItem) =>
    sellItem.title.toLowerCase().includes(searchQuery.toLowerCase())||
    sellItem.condition.toLowerCase().includes(searchQuery.toLowerCase())||
    sellItem.type.toLowerCase().includes(searchQuery.toLowerCase())||
    sellItem.color.toLowerCase().includes(searchQuery.toLowerCase())||
    sellItem.brand.toLowerCase().includes(searchQuery.toLowerCase())||
    sellItem.bank.toLowerCase().includes(searchQuery.toLowerCase())||
    sellItem.accname.toLowerCase().includes(searchQuery.toLowerCase())||
    sellItem.name.toLowerCase().includes(searchQuery.toLowerCase())||
    sellItem.email.toLowerCase().includes(searchQuery.toLowerCase())||
    sellItem.orderstatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-400 py-2 px-4 rounded-md w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className='w-full table-auto border-collapse'>
        <thead>
          <tr className="bg-black text-white">
            <th className='border border-black-600 py-3 px-4 w-10'>No</th>
            <th className='border border-black-600 py-3 px-4'>Instrument</th>
            <th className='border border-black-600 py-3 px-4'>Condition</th>
            <th className='border border-black-600 py-3 px-4'>Price</th>
            <th className='border border-black-600 py-3 px-4'>Type</th>
            <th className='border border-black-600 py-3 px-4'>Color</th>
            <th className='border border-black-600 py-3 px-4'>Brand</th>
            <th className='border border-black-600 py-3 px-4'>Description</th>
            <th className='border border-black-600 py-3 px-4'>Quantity</th>
            <th className='border border-black-600 py-3 px-4'>Bank</th>
            <th className='border border-black-600 py-3 px-4'>Acc No</th>
            <th className='border border-black-600 py-3 px-4'>Acc Name</th>
            <th className='border border-black-600 py-3 px-4'>Name</th>
            <th className='border border-black-600 py-3 px-4'>Email</th>
            <th className='border border-black-600 py-3 px-4'>Phone No</th>
            <th className='border border-black-600 py-3 px-4'>Image</th>
            <th className='border border-black-600 py-3 px-4'>Order Status</th>
            <th className='border border-black-600 py-3 px-4 w-20'>Operations</th> 
          </tr>
        </thead>
        <tbody>
          {filteredSellItems.map((sellItem, index) => (
            <tr key={sellItem._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className='border border-gray-400 py-3 px-4 text-center'>{index + 1}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.title}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.condition}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.price}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.type}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.color}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.brand}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.description}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.quantity}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.bank}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.accno}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.accname}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.name}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.email}</td>
              <td className='border border-gray-400 py-3 px-4'>{sellItem.phoneno}</td>
              <td className='border border-gray-400 py-3 px-4'>
              <img src={`http://localhost:5050/uploads/${sellItem.simage}`} alt={sellItem.title} className="w-full h-64 object-cover" />
              </td>


              <td className='border border-gray-400 py-3 px-4'>{sellItem.orderstatus}</td>
              
              <td className='border border-gray-400 py-3 px-4'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/sellItem/details/${sellItem._id}`} className='text-blue-600 hover:text-blue-800'>
                    <BsInfoCircle className='text-xl' />
                  </Link>
                  <Link to={`/sellItem/edit/${sellItem._id}`} className='text-yellow-600 hover:text-yellow-800'>
                    <AiOutlineEdit className='text-xl' />
                  </Link>
                  <Link to={`/sellItem/delete/${sellItem._id}`} className='text-red-600 hover:text-red-800'>
                    <MdOutlineDelete className='text-xl' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
