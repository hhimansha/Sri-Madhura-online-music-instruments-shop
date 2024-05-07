import React, { useState, useEffect } from "react";
import { useCart } from '../../hooks/useCart';
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import emptyCart from "./images/emptyCart.png"
import { v4 as uuidv4 } from 'uuid'; // Import uuid library

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const { cart, updateCart } = useCart();
  const { user } = useAuthContext();

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCarts = JSON.parse(localStorage.getItem("cart")) || [];
    setCarts(storedCarts);
  }, []);

  const handleClick = (cartId) => {

    // Remove the specific cart item from state
    const updatedCarts = carts.filter((cart) => cart.id !== cartId);
    
    // Update the state and local storage
    setCarts(updatedCarts);
    updateCart(updatedCarts);
    localStorage.setItem("cart", JSON.stringify(updatedCarts));
  };

  // Calculate total price
  const total = carts.reduce((acc, cart) => acc + cart.TotPrice, 0);

  return (
    

 <section class="py-10 ">
  
 
     <div class="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
         <div>
             
             <div class="p-6 mb-8  shadow-md dark:bg-grey-light rounded-3xl ">
                 <div class="flex-wrap items-center hidden mb-4 -mx-4 md:flex md:mb-4">
                     <div class="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                         <h2 class="font-semibold text-gray-500 text-center -ml-10">Product name</h2>
                     </div>
                     <div class="hidden px-4 lg:block lg:w-2/12">
                         <h2 class="font-semibold text-gray-500 ">Price</h2>
                     </div>
                     <div class="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                         <h2 class="font-semibold text-gray-500 ">Quantity</h2>
                     </div>
                     <div class="w-auto px-4 text-right md:w-1/6 lg:w-2/12 justify-center">
                         <h2 class="font-semibold text-gray-500 text-left "> Subtotal</h2>
                     </div>
                 </div>
                 
                 <div class="py-1 mb-0 border-t dark:border-gray-400 " >
                 {carts.length > 0 ? (
                  carts.map((cart) => (
                  <div class="flex flex-wrap border-b dark:border-gray-400 items-center py-4  my-4  -mx-4 md:my-2 duration-500 hover:shadow-xl"  key={cart.id}>
                         <div class="w-full px-4 mb-4 md:w-4/6 lg:w-6/12 md:mb-0">
                             <div class="flex flex-wrap items-center -mx-4">
                                 <div class="w-full px-4 mb-3 md:w-1/3">
                                     <div class="w-full h-96 md:h-24 md:w-24">
                                         <img src={cart.imageSrc} alt={cart.proteinName}
                                             class="object-cover w-full h-full"/>
                                     </div>
                                 </div>
                                 <div class="w-2/3 px-4">
                                     <h2 class=" text-lg font-semibold dark:text-grey">{cart.proteinName}</h2>
                                 </div>
                             </div>
                         </div>
                         <div class="hidden px-4 lg:block lg:w-2/12">
                             <p class="text-lg font-bold  dark:text-grey">Rs.{cart.price}</p>
   
                         </div>
                         <div class="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                         <div className="px-4 w-1/6 md:w-1/6 lg:w-1/6"><span className="font-bold">{cart.qty}</span></div>
                         </div>
                         <div class="w-auto px-4 text-right md:w-1/6 lg:w-2/12 flex items-center">
                             <p class="text-lg font-bold text-orange-400 dark:text-grey">Rs.{cart.TotPrice.toFixed(2)}</p>
                             <button onClick={() => handleClick(cart.id)}>
                                 <div className="p-2 bg-grey rounded-full ml-4">
                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
                                  <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M20.5,4c-0.49034,-0.00628 -0.95279,0.22749 -1.23848,0.62606c-0.28569,0.39856 -0.35854,0.9116 -0.19511,1.37394h-2.92578c-1.83725,0 -3.5577,0.91945 -4.57617,2.44922l-2.36719,3.55078h-1.69727c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h2.26367c0.14761,0.02215 0.2977,0.02215 0.44531,0h26.12109l-1.57227,14.67969c-0.07134,0.54019 0.15584,1.07659 0.59345,1.40123c0.43761,0.32464 1.01684,0.38647 1.51312,0.16152c0.49628,-0.22495 0.83156,-0.70131 0.87585,-1.24439l1.60742,-14.99805h1.15234c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-1.69727l-2.36719,-3.55078c-1.01929,-1.52894 -2.73955,-2.44922 -4.57617,-2.44922h-2.92578c0.16343,-0.46234 0.09058,-0.97538 -0.19511,-1.37394c-0.28569,-0.39856 -0.74814,-0.63234 -1.23848,-0.62606zM16.14063,9h15.71875c0.83737,0 1.61537,0.41622 2.08008,1.11328l1.25781,1.88672h-22.39453l1.25781,-1.88672c0.00065,-0.00065 0.0013,-0.0013 0.00195,-0.00195c0.46348,-0.69619 1.23938,-1.11133 2.07813,-1.11133zM10.57227,17.65039c-0.42313,0.00966 -0.8225,0.19761 -1.09962,0.51752c-0.27712,0.3199 -0.40622,0.74198 -0.35546,1.16217l2.00781,18.75586c0.29835,2.78234 2.67084,4.91406 5.46875,4.91406h14.81055c2.79791,0 5.1704,-2.13172 5.46875,-4.91406l0.37305,-3.48047c0.07134,-0.54019 -0.15584,-1.07659 -0.59345,-1.40123c-0.43761,-0.32464 -1.01684,-0.38647 -1.51312,-0.16152c-0.49628,0.22495 -0.83156,0.70131 -0.87586,1.24438l-0.37305,3.47852c-0.13765,1.28366 -1.19624,2.23438 -2.48633,2.23438h-14.81055c-1.29009,0 -2.34673,-0.95071 -2.48437,-2.23437l-2.00977,-18.75391c-0.0727,-0.78442 -0.73976,-1.37897 -1.52734,-1.36133z"></path></g></g>
                                  </svg>
                                 </div>
                             </button>
                         </div>
                     </div>
                     ))
                     ) : (
                       <div className="flex items-center justify-center h-96">
                       <div className="text-center items-center justify-center">
                         <img src={emptyCart} className="w-40  mx-auto" alt="Empty Cart" />
                         <p className="text-gray-500 text-5xl font-semibold opacity-25 mt-4">Cart is empty</p>
                       </div>
                     </div>
                     
                     )}
                     
                 </div>
                 
             </div>
             
         </div>
     </div>
     
   
   {carts.length > 0 && (
     
     <div className="bg-grey-light rounded-lg p-8 drop-shadow-md my-10 max-w-4xl mx-auto flex flex-wrap justify-between items-center">
       
       <div className="font-bold text-2xl w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0 "><span className="text-gray-500 text-2xl">
        Total Price : </span>$ {total.toFixed(2)}</div>
       <div className="w-full md:w-1/2 lg:w-1/3">
         <Link to='/place-order'>
         <button type="button" class="group inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-grey">
           Check Out
           <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
             <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
           </svg>
         </button>
           
         </Link>
       </div>
     </div>
     )}
 </section>


  );
};

export default Cart;
