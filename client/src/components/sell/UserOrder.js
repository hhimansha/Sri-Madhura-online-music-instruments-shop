import React, { useEffect, useState, useReducer } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useOrderContext } from '../../hooks/useOrderContext';

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const { dispatch } = useOrderContext();
  const { user } = useAuthContext();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  console.log('User object:', user._id);

  const handleClick = async (orderId) => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:9092/api/order/admindash/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_ORDER', payload: json });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const truncateOrderId = (orderId) => {
    const truncatedId = "..." + orderId.slice(-3);
    return truncatedId;
  };

  const copyToClipboard = (text) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Order ID copied to clipboard: " + text);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) {
          return;
        }

        const response = await fetch(`http://localhost:9092/api/order/orders/user/${user._id}`);
        const data = await response.json();
        forceUpdate();

        console.log('Fetched orders:', data);

        if (response.ok) {
          setOrders(data);
        } else {
          console.error('Error fetching orders:', data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [reducerValue, user]);

  console.log('User Orders:', orders); // Log user orders

  // Check if there are orders before rendering
  if (orders.length === 0) {
    return <div></div>;
  }


  return (
    
    <div class="p-6 pt-0 my-8  shadow-md dark:bg-grey-light rounded-2xl ">
                 <div class="flex-wrap items-center hidden  -mx-4 md:flex">
                    <div class="w-full   md:w-1/6 lg:w-1/12 md:mb-0">
                         <h2 class="text-10  bg-grey-light font-semibold text-gray-500   text-left w-full py-2 pl-10 rounded-tl-3xl">ID</h2>
                     </div>
                     <div class="w-full   md:w-2/6 lg:w-6/12 md:mb-0">
                         <h2 class="text-10  bg-grey-light font-semibold text-gray-500   text-left w-full py-2 pl-10 ">Order Details</h2>
                     </div>

                     <div class="w-auto md:w-1/6 lg:w-1/12 ">
                         <h2 class="text-10  bg-grey-light font-semibold text-gray-500  text-left w-full  pl-6">Qty</h2>
                     </div>
                     <div class="w-auto text-right md:w-2/6 lg:w-4/12 justify-center">
                         <h2 class="text-10  bg-grey-light font-semibold text-gray-500 text-left w-full py-2 pl-4 rounded-tr-3xl"> Subtotal</h2>
                     </div>
                 </div>
                 
                 <div class="py-1 mb-0 border-t dark:border-gray-400 " >
                 
                  {orders.map((order) => (
                  <div class="flex flex-wrap border-b dark:border-gray-400 items-center pb-4 my-4 -mx-4 md:my-2 duration-500 hover:shadow-xl" key={order._id}>
                         <div class="w-auto px-4 md:w-1/6 lg:w-1/12 ">
                          <div className="px-4 w-1/6 md:w-1/6 lg:w-1/6 flex items-center">
                            <span className="font-semibold mr-2">
                              {truncateOrderId(order._id)}
                            </span>
                            <button
                              className="text-xs text-blue-500 underline cursor-pointer"
                              onClick={() => {
                                copyToClipboard(order._id);
                              }}
                            >
                              <svg id='Copy_24' width='20' height='20' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' ><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
                                 <g transform="matrix(1 0 0 1 12 12)" >
                                <path  transform=" translate(-12, -12)" d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z" stroke-linecap="round" />
                                </g>
                                </svg>
                            </button>
                          </div>
                        </div>
                         <div class="w-full md:px-2 lg:px-10 mb-2 md:w-4/6 lg:w-6/12 md:mb-0">
                             <div class="flex flex-wrap items-center -mx-4">
                                 <div class="w-full px-4 mb-3 md:w-1/3">
                                     <div class="w-full h-96 md:h-24 md:w-24">
                                         <img src={order.imageSrc} alt={order.proteinName}
                                             class="object-cover w-full h-full"/>
                                     </div>
                                 </div>
                                 <div class="w-2/3 px-4">
                                     <h2 class=" text-md font-semibold dark:text-grey">{order.proteinName}</h2>
                                 </div>
                             </div>
                         </div>
           
                         <div class="w-auto px-4 md:w-1/6 lg:w-1/12 ">
                          <div className="px-4 w-1/6 md:w-1/6 lg:w-1/6"><span className="font-bold">{order.qty}</span></div>
                        </div>

                        <div class="w-auto px-4 text-right md:w-1/6 lg:w-2/12 flex items-center">
                          <p class="text-md font-bold text-orange-400 dark:text-grey">${order.TotPrice.toFixed(2)}</p>
                          
                         </div>
                         <button
                                  onClick={() => handleClick(order._id)}
                                className="px-5 py-2 text-md text-white  rounded-lg border focus:outline-none bg-grey"
                              
                              >
                                Cancel Order
                              </button>
                     </div>
                     ))
                    }
                     
                 </div>
                 
             </div>

  );
};

export default UserOrder;
