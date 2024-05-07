import { Link } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// Corrected import statements
import { motion } from 'framer-motion';

const ProteinDetails = ({ protein, index }) => {
  const [qty, setQty] = useState(1);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2, // Adjust the delay as needed
      },
    },
  };
  

  const addToCart = () => {
    try {
      // Ensure protein.price and qty are valid numbers
      const proteinPrice = parseFloat(protein.price);
      const quantity = parseInt(qty);

      // Calculate TotPrice once
      const calculatedTotPrice = proteinPrice * quantity;

      // Generate a unique identifier for the cart item
      const cartItemId = uuidv4();

      // Retrieve existing cart items from local storage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Add the current item to the cart with a unique identifier
      const updatedCart = [
        ...existingCart,
        {
          id: cartItemId,  // Use the generated unique identifier
          proteinId: protein._id,
          proteinName: protein.title,
          qty: quantity,
          imageSrc: protein.imageSrc,
          price: protein.price,
          TotPrice: calculatedTotPrice,
        },
      ];

      // Save the updated cart back to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // You may want to add some UI feedback here
      console.log('Item added to cart:', updatedCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error and show appropriate UI feedback
    }
  };

  return (
    <motion.div 
    variants={fadeIn} 
    initial="hidden"
    animate="visible" 
    className="fetchAllproteins w-64 "
  >
    
    <div className="protein text-black m-5 duration-500 hover:scale-105 hover:shadow-xl">
      
      <div className="max-w-sm bg-white rounded-lg drop-shadow-md ">
        <Link to={`/product/${protein._id}`}>
          <img src={protein.imageSrc} alt={protein.title} className="rounded-t-lg w-56 h-72 " />
        </Link>
        <div className="px-5 py-2">
          <Link to={`/product/${protein._id}`}>
            <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-grey">{protein.title}</h5>
          </Link>
          <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-500">{protein.company}</p>
          <p className="mb-2 text-16 font-bold tracking-tight text-primary">${protein.price}</p>
          
        </div>
      </div>
    </div>
  </motion.div>

  );
}

export default ProteinDetails;
