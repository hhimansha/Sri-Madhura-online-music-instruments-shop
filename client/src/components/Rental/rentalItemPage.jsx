import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css'; // Import your custom styles

function RentalItemPage() {
  const { id } = useParams();
  const [rentalItem, setRentalItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rentalDate, setRentalDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);

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
    setTotalPrice(parseInt(e.target.value) * rentalItem.rentalPrice * numberOfDays);
  };

  const handleRentalDateChange = (date) => {
    setRentalDate(date);
  };

  const handleNumberOfDaysChange = (e) => {
    setNumberOfDays(e.target.value);
    setTotalPrice(parseInt(e.target.value) * rentalItem.rentalPrice * quantity);
  };

  const handleSubmit = async () => {
    try {
      // Validate form fields
      if (!rentalDate) {
        throw new Error('Please select a rental date');
      }
      if (quantity < 1 || quantity > 7) {
        throw new Error('Quantity must be between 1 and 7');
      }
      if (numberOfDays < 1 || numberOfDays > 7) {
        throw new Error('Number of days must be between 1 and 7');
      }
  
      // Calculate total price
      const totalPriceValue = rentalItemPrice * numberOfDays * quantity;
  
      // Create rental order object
      const rentalOrder = {
        rentalItemID: rentalItem._id,
        image: rentalItem.image,
        title: rentalItem.title,
        quantity: parseInt(quantity),
        totalPrice: totalPriceValue,
        rentalDate: rentalDate,
        numberOfDays: parseInt(numberOfDays),
        orderDate: new Date() // Add order date
      };
  
      // Send POST request to create rental order
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
  
      // Clear form fields after successful submission
      setQuantity(1);
      setRentalDate(null);
      setNumberOfDays(1);
      setTotalPrice(null); // Clear total price
  
      // Show success message or redirect user
      alert('Rental order created successfully!');
    } catch (error) {
      // Handle errors
      console.error(error);
      setError(error.message);
    }
  };
  
  

  const maxNumberOfDays = 7;

  const rentalItemPrice = rentalItem ? rentalItem.rentalPrice : null;

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
              {error && <div className="text-red-500 mb-2">{error}</div>} {/* Display error message */}
              <label className="block mb-2 font-semibold">Quantity :</label>
              <input type="number" className="w-full px-2 py-1 border rounded bg-gray-100" value={quantity} onChange={handleQuantityChange} min={1} max={7}/>
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
            <p className="text-lg mt-2">Rental Item Price: Rs.{rentalItemPrice}</p>
            {totalPrice && <p className="text-lg">Total Price: Rs.{totalPrice}</p>} {/* Display total price */}
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
