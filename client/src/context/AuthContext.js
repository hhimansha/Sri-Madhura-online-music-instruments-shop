import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        user: {
          ...action.payload,
          DeliveryAddress: action.payload.DeliveryAddress || {},
        },
        isAdmin: action.payload.isAdmin || false,
        loading: false,
      };
      case 'UPDATE_USER':
        localStorage.setItem('user', JSON.stringify(action.payload));
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload, // Assuming the payload contains all user details
          },
          isAdmin: action.payload.isAdmin || false,
          loading: false,
        };

    case 'LOGOUT':
      localStorage.removeItem('user');
      return { user: null, isAdmin: false, loading: false };

    case 'DELETE_USER':
      return {
        ...state,
        user: state.user.filter((u) => u._id !== action.payload._id),
      };

    case 'LOADING_COMPLETE':
      return { ...state, loading: false }; // New action type

    case 'UPDATE_DELIVERY_ADDRESS':
      localStorage.setItem('user', JSON.stringify({
        ...state.user,
        DeliveryAddress: action.payload || {},
      }));
      return {
        ...state,
        user: {
          ...state.user,
          DeliveryAddress: action.payload || {},
        },
      };
    
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: storedUser });
    } else {
      // Set user to null when there is no stored user
      dispatch({ type: 'LOGOUT' });
    }
  
    // Set loading to false after updating the state
    dispatch({ type: 'LOADING_COMPLETE' });
  }, []);

console.log('Auth context state :', state)
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {state.loading ? (
        // You can render a loading spinner or a placeholder during loading
        <div>Loading...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

