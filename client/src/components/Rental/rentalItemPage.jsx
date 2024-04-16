import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './custom-datepicker.css';

function RentalItemPage() {
  const { id } = useParams();
  const [rentalItem, setRentalItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rentalDate, setRentalDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(1);

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
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleRentalDateChange = (date) => {
    setRentalDate(date);
  };

  const handleNumberOfDaysChange = (e) => {
    setNumberOfDays(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const rentalOrder = {
        rentalItemID: rentalItem._id,
        image: rentalItem.image,
        title: rentalItem.title,
        quantity: parseInt(quantity),
        totalPrice: parseInt(rentalItem.rentalPrice) * parseInt(numberOfDays),
        rentalDate: rentalDate,
        numberOfDays: parseInt(numberOfDays),
      };

      const response = await fetch('http://localhost:5050/api/rental-orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rentalOrder),
      });

      if (!response.ok) {
        throw new Error('Failed to create rental order');
      }

      setQuantity(1);
      setRentalDate(null);
      setNumberOfDays(1);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const maxNumberOfDays = 7;

  return (
    <div className="container mx-auto py-8">
      {rentalItem && (
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto my-10">
          <div className="md:w-1/2">
            <img src={`http://localhost:5050/uploads/${rentalItem.image}`} alt={rentalItem.title} className="w-[600px] h-auto shadow-xl rounded-2xl" />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0 md:ml-40 text-left">
            <div className='border-b-2 pb-6'>
            <h2 className="text-2xl font-semibold">{rentalItem.title}</h2>
            
            <p className="text-md mt-2 text-gray-600">Category : <span className='font-semibold text-gray-600'>{rentalItem.category}</span></p>
            </div>
            <div className="mt-4">
              <label className="block mb-2 font-semibold">Quantity :</label>
              <input type="number" className="w-full px-2 py-1 border rounded bg-gray-100" value={quantity} onChange={handleQuantityChange} min={1} />
            </div>
            <div className="mt-4">
              <label className="block mb-2 font-semibold">Rental Date:</label>
              <DatePicker
                selected={rentalDate}
                onChange={handleRentalDateChange}
                minDate={new Date()}
                inline
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 font-semibold">Number of Days:</label>
              <input
                type="number"
                className="w-full px-2 py-1 border rounded bg-gray-100"
                value={numberOfDays}
                onChange={handleNumberOfDaysChange}
                min={1}
                max={maxNumberOfDays}
              />
            </div>
            <p className="text-lg mt-2">Rs.{rentalItem.rentalPrice} per day</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentalItemPage;
