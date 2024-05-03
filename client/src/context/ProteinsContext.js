import { createContext, useReducer } from 'react';

export const ProteinsContext = createContext();

export const proteinsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROTEIN':
      return { 
        protein: action.payload 
      };
    case 'CREATE_PROTEIN':
      return { 
        protein: [action.payload, ...state.protein] 
      };
    case 'DELETE_PROTEIN':
      return{
        protein : state.protein.filter((b) => b._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export const ProteinsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(proteinsReducer, { 
    protein: []
  });
  
  
  return (
    <ProteinsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ProteinsContext.Provider>
  );
};
