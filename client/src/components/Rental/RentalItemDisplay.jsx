import React, { useState, useEffect } from 'react';

function RentalItemDisplay() {
  const [rentalItems, setRentalItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentalItems = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/rentals/');
        if (!response.ok) {
          throw new Error('Failed to fetch rental items');
        }
        const data = await response.json();
        setRentalItems(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRentalItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 m-10">
      {rentalItems.map((rentalItem) => (
        <div key={rentalItem._id} className="bg-white shadow-md rounded-md overflow-hidden">
          <img src={rentalItem.image} alt={rentalItem.title} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{rentalItem.title}</h2>
            <p className="text-gray-600">{rentalItem.description}</p>
            <p className="text-gray-800 mt-2">${rentalItem.rentalPrice} per day</p>
            <p className="text-gray-800">Stock Count: {rentalItem.stockCount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RentalItemDisplay;
