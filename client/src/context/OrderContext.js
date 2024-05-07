import { createContext, useReducer } from 'react';

export const OrderContext = createContext();

export const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return { 
        order: action.payload 
      };
    case 'CREATE_ORDER':
      return { 
        order: [action.payload, ...state.order] 
      };
    case 'DELETE_ORDER':
      return{
        order : state.order.filter((b) => b._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { 
    order: []
  });
  
  
  return (
    <OrderContext.Provider value={{ ...state, dispatch }}>
      { children }
    </OrderContext.Provider>
  );
};
