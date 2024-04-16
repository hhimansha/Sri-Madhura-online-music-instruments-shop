import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RentalItemPage() { // Rename function to RentalItemPage
  const { id } = useParams(); // Get the id parameter from the URL
  const [rentalItem, setRentalItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentalItem = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/rentals/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rental item');
        }
        const data = await response.json();
        setRentalItem(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRentalItem();
  }, [id]); // Fetch rental item when id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      {rentalItem && (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img src={`http://localhost:5050/uploads/${rentalItem.image}`} alt={rentalItem.title} className="w-full h-auto" />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0 md:ml-8">
            <h2 className="text-2xl font-semibold">{rentalItem.title}</h2>
            <p className="text-lg mt-2">${rentalItem.rentalPrice} per day</p>
            <p className="mt-4">{rentalItem.description}</p>
            {/* Add input options for ordering */}
            <div className="mt-4">
              <label className="block mb-2">Quantity:</label>
              <input type="number" className="w-20 px-2 py-1 border rounded" defaultValue={1} min={1} />
            </div>
            {/* Add more input options as needed */}
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentalItemPage;
