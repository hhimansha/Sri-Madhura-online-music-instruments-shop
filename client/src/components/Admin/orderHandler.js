import React, { useEffect, useState, useReducer } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import {useOrderContext} from '../../hooks/useOrderContext'


const OrderHandler = () => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { dispatch } = useOrderContext();
  const { user } = useAuthContext();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleClick = async (orderId) => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:9092/api/order/admindash/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        }
      );
      

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_ORDER", payload: json });
        
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'http://localhost:9092/api/order/admindash/orders'
        );
        forceUpdate();
        const data = await response.json();

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
  }, [reducerValue]);

  useEffect(() => {
    // Calculate the total price when orders change
    const total = orders.reduce((acc, order) => acc + order.TotPrice, 0);
    setTotalPrice(total);
  }, [orders]);

  return (
    <div className="bg-grey-light rounded-3xl p-8 drop-shadow-md my-10">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr>
          <th
            colSpan="8"
            className="text-lg text-primary font-semibold bg-grey mb-4 text-left"
          >
            Stored Proteins
          </th>
        </tr>
        <tr>
          <th className="w-1/8">Order ID</th>
          <th className="w-1/8">User ID</th>
          <th className="w-1/8">Image</th>
          <th className="w-1/8">Shipping Address</th>
          <th className="w-1/8">Protein Title</th>
          <th className="w-1/8">Qty</th>
          <th className="w-1/8">Total Price</th>

        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="my-10">
            <td>{order._id}</td>
            <td>{order.userId}</td>
            <td>
              <div className="w-32 h-36">
                <img
                  src={order.imageSrc}
                  alt={order.bookName}
                  className="rounded-t-lg w-32 h-36"
                />
              </div>
            </td>
            <td>
              {order.street}
            </td>
            <td>{order.bookName}</td>
            <td>{order.qty}</td>
            <td>{order.TotPrice}</td>
            <td>
              <div className="grid gap-2">
    
                <button
                    onClick={() => handleClick(order._id)}
                  className="px-5 py-2 text-lg text-white font-semibold rounded-full border focus:outline-none bg-red-500"
                
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="mt-4 text-lg font-semibold text-primary">
        Total: ${totalPrice}
      </div>
</div>

  );
};

export default OrderHandler;
