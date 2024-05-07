import React, { useState, useEffect } from 'react';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import img1 from '../assets/headerLogoH.png';
import { useCart } from '../../hooks/useCart';

function HeaderPart() {
  const { Logout } = useLogout();
  const { user } = useAuthContext();
  const { cart } = useCart(); // Use the cart state from CartContext

  const handleClick = () => {
    Logout();
  };

  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const handleBodyOverflow = () => {
      if (isNavVisible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleBodyOverflow();

    return () => {
      // Cleanup to reset body overflow on component unmount
      document.body.style.overflow = 'auto';
    };
  }, [isNavVisible]);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <nav className={`bg-white  z-20 sticky top-0 w-full border-b border-gray-200  ${isNavVisible ? 'h-screen md:h-14' : 'h-14'}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-1">
      <Link to="/" className="navbar-brand">
                    <div>
                        <img src={img1} alt="Logo" width="130" className="d-inline-block align-text-top" />
                    </div>
                </Link>
        <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse items-center">
            
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse m-0">
            <button
              onClick={toggleNav}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`items-center w-full md:flex md:w-auto md:order-2 ${isNavVisible ? 'block text-center' : 'hidden'}`}
          id="navbar-sticky"
        >
           <ul className="items-center flex flex-col p-4 md:p-0 mt-4 mx-2 font-medium -100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
                <a href="/" className="block py-2 px-3 text-gray-900 rounded  md:hover:text-primary md:p-0 md:dark:hover:text-primary   dark:hover:text-white dark:border-gray-700">Home</a>
            </li>
            <li>
                <a href="/" className="block py-2 px-3 text-gray-900 rounded md:hover:text-primary md:p-0 md:dark:hover:text-primary   dark:hover:text-white ">Categories</a>
            </li>
            <li>
                <a href="/" className="block py-2 px-3 text-gray-900 rounded   md:hover:text-primary md:p-0 md:dark:hover:text-primary  dark:hover:text-primary  ">About</a>
            </li>
            <li>
                <a href="/" className="block py-2 px-3 text-gray-900 rounded  md:hover:text-primary md:p-0 md:dark:hover:text-primary   ">Contact</a>
            </li>
            <li>
            <div className="relative">
              <div className="flex flex-row cart-img  rounded-full items-center px-2 justify-center">
                <Link to='/cart'>
                <svg id='Shopping_Cart_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
                  <g transform="matrix(1.53 0 0 1.53 12 12)" >
                  <path transform=" translate(-7.55, -7.5)" d="M 1 0.992188 L 1 1.992188 L 3 1.992188 C 3.214844 1.992188 3.398438 2.132813 3.46875 2.335938 L 4.402344 10.667969 C 4.488281 11.421875 5.136719 12 5.894531 12 L 12 12 L 12 11 L 5.894531 11 C 5.636719 11 5.425781 10.8125 5.398438 10.558594 L 5.335938 10 L 11.679688 10 C 12.390625 10 13.011719 9.492188 13.152344 8.796875 L 14.109375 4 L 4.660156 4 L 4.445313 2.09375 L 4.429688 2.046875 C 4.238281 1.421875 3.65625 0.996094 3 0.992188 Z M 11 12 C 10.449219 12 10 12.449219 10 13 C 10 13.550781 10.449219 14 11 14 C 11.550781 14 12 13.550781 12 13 C 12 12.449219 11.550781 12 11 12 Z M 6 12 C 5.449219 12 5 12.449219 5 13 C 5 13.550781 5.449219 14 6 14 C 6.550781 14 7 13.550781 7 13 C 7 12.449219 6.550781 12 6 12 Z M 4.773438 5 L 12.890625 5 L 12.171875 8.597656 C 12.121094 8.835938 11.921875 9 11.679688 9 L 5.222656 9 Z" stroke-linecap="round" />
                  </g>
                  </svg>
                </Link>
              </div>
              {cart.length > 0 && (
                    <span className="absolute top-0 -right-2 bg-grey text-white rounded-full px-2 py-1 text-xs">
                      {cart.length}
                    </span>
                  )}
            </div>

  </li>
            
        </ul>
        
        {user && (<>
                        <div className="user justify-center">
                            <Link to="/user">
                                <div className="flex items-center mx-1 rounded-full px-2 justify-center">
                            
                                <svg id='Male_User_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' ><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
                                        <g transform="matrix(0.77 0 0 0.77 12 12)" >
                                        <path   transform=" translate(-16, -16)" d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 16 8 C 13.25 8 11 10.25 11 13 C 11 14.515625 11.707031 15.863281 12.78125 16.78125 C 10.53125 17.949219 9 20.300781 9 23 L 11 23 C 11 20.226563 13.226563 18 16 18 C 18.773438 18 21 20.226563 21 23 L 23 23 C 23 20.300781 21.46875 17.949219 19.21875 16.78125 C 20.292969 15.863281 21 14.515625 21 13 C 21 10.25 18.75 8 16 8 Z M 16 10 C 17.667969 10 19 11.332031 19 13 C 19 14.667969 17.667969 16 16 16 C 14.332031 16 13 14.667969 13 13 C 13 11.332031 14.332031 10 16 10 Z" stroke-linecap="round" />
                                        </g>
                                        </svg>
                                    <span className="p-2 font-semibold text-primary">{user.email.split('@')[0]}</span>
                                </div>
                            </Link>
                        </div>

                        <div className="logout">
                            <Link to="/" className="mx-2">
                                <button type="button" onClick={handleClick} className="px-5 py-2 text-20 text-grey  font-semibold rounded-lg border border-grey transition duration-1000 ease-in-out hover:text-white hover:bg-grey">Log Out</button>
                            </Link>
                        
                        </div>
                    </>
                )}
   
   {!user && (
                    <Link to="/login" className="navbar-brand">
                        <button type="button" className="px-5 py-2 mx-6  text-20 text-white bg-primary font-semibold rounded-lg border border-grey transition duration-1000 ease-in-out hover:text-white hover:bg-grey">Log In</button>
                    </Link>
                            
                )}
        

       
        </div>
      </div>
    </nav>
    
  );
}

export default HeaderPart;
