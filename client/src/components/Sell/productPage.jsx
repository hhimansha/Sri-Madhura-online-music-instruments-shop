import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { v4 as uuidv4 } from 'uuid';
import ItemAddedCart from './AlertBoxes/ItemAddedCart';
import { motion } from 'framer-motion';

function ProductPage() {
  const { proteinId } = useParams();
  const [protein, setProtein] = useState(null);
  const [qty, setQty] = useState(1);
  const [calculatedTotPrice, setCalculatedTotPrice] = useState(0);
  const [success, setSuccess] = useState(false);

  // Add a fake array for demonstration
  const fakeArray = [1];
  const { updateCart } = useCart();

  const addToCart = () => {
    try {
      // Ensure protein.price is a valid number
      const proteinPrice = parseFloat(protein.price);

      // Calculate TotPrice using the captured quantity
      const updatedCalculatedTotPrice = proteinPrice * qty;

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
          qty: qty,  // Use the captured quantity
          imageSrc: protein.imageSrc,
          price: protein.price,
          TotPrice: updatedCalculatedTotPrice,
        },
      ];

      // Save the updated cart back to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      updateCart(updatedCart);

      // Update the calculatedTotPrice state
      setCalculatedTotPrice(updatedCalculatedTotPrice);
      setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1500);

      // You may want to add some UI feedback here
      console.log('Item added to cart:', updatedCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error and show appropriate UI feedback
    }
  };


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  useEffect(() => {
    // Update calculatedTotPrice when qty changes
    setCalculatedTotPrice(parseFloat(protein?.price || 0) * qty);
  }, [qty, protein]);
  
    useEffect(() => {
      const fetchProtein = async () => {
        try {
          const response = await fetch(`http://localhost:5050/api/admindash/products/${proteinId}`);
          const json = await response.json();
  
          if (response.ok) {
            setProtein(json);
          } else {
            // Handle error case, e.g., redirect to home or show an error message
            console.error(`Error fetching protein: ${response.status}`);
          }
        } catch (error) {
          console.error('Error fetching protein:', error);
        }
      };
  
      fetchProtein();
    }, [proteinId]);
  
    const incrementQty = () => {
      setQty((prevQty) => (prevQty < 10 ? prevQty + 1 : prevQty));
    };
  
    const decrementQty = () => {
      setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));
    };


  return (
    <div>
    {protein ? (
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="overflow-hidden bg-white pb-11 font-poppins mx-auto">
        {fakeArray.map((item, index) => (
          <div key={index}>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
              <div className="container px-5 py-14 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                  <img alt="ecommerce" className="lg:w-5/12 w-full object-cover object-center rounded-2xl border border-gray-200"
                   src={protein.imageSrc} />
                  <div className="lg:w-1/2 w-full lg:pl-20 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">{protein.company}</h2>
                    <h1 className="text-grey text-3xl title-font font-medium mb-6">{protein.title}</h1>
                    <div className="flex mb-4">
                      {/* Your review stars and icons here */}
                    </div>
                    <p className="leading-relaxed mb-10 text-grey">{protein.description}.</p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                      {/* Your quantity selector here */}
                      <div className="wrapper h-10 w-28 flex items-center justify-center bg-white rounded-full">
                        <span
                          className="w-full text-center text-black font-semibold cursor-pointer select-none bg-gray-200 hover:bg-gray-300 py-2 rounded-l-full"
                          onClick={decrementQty}
                        >
                          -
                        </span>
                        <span className="w-full text-center text-50 font-semibold   cursor-not-allowed">
                          {qty < 10 ? `0${qty}` : qty}
                        </span>
                        <span
                          className="w-full text-center text-black font-semibold cursor-pointer select-none bg-gray-200 hover:bg-gray-300 py-2 rounded-r-full"
                          onClick={incrementQty}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="grid">
                      <span className="title-font font-medium text-2xl text-grey mb-10">${protein.price}</span>
                      <button
                        onClick={addToCart}
                        type="button"
                        className="group inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-grey"
                      >
                        Add To Cart
                        <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
        {success && <ItemAddedCart />}
      </motion.div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}

export default ProductPage;