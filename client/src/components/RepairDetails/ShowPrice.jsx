import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Back from '../RepairDetails/Back';

const ShowPrice = () => {
  const [price, setPrice] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5050/prices/${id}`)
      .then((response) => {
        setPrice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
        backgroundImage: "url('/images/repairB4.jpeg')", 
        backgroundSize: 'cover', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px' 
      }}>
    
      <div className="bg-white rounded-lg shadow-lg p-8">
        
        <h1 className="text-3xl font-bold mb-6">Show Details</h1>
        
        <div className="grid grid-cols-1 gap-y-4">
          <div className="flex justify-between">
            <span className="text-gray-700 font-bold">Id:</span>
            <span>{price._id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700 font-bold">Issue Type:</span>
            <span>{price.issueType2}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-700 font-bold">Price:</span>
            <span>{price.fprice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700 font-bold">Issue Details:</span>
            <span>{price.issueDetail}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700 font-bold">Create Time:</span>
            <span>{new Date(price.createdAt).toString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700 font-bold">Last Update Time:</span>
            <span>{new Date(price.updatedAt).toString()}</span>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default ShowPrice;
