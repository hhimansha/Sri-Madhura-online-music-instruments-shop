import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const clearCartOnLogout = () => {
    // Clear cart items from local storage when logging out
    localStorage.removeItem("cart");
  };

  const Logout = () => {
    if (dispatch) {
      // remove user from storage
      localStorage.removeItem('user');

      // dispatch logout function
      dispatch({ type: 'LOGOUT' });

      // Clear cart items when logging out
      clearCartOnLogout();
    } else {
      console.error("Dispatch function not available");
    }
  };

  return { Logout };
};
