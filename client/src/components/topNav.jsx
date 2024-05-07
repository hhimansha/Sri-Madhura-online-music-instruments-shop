import React, { useState, useEffect, useRef } from "react";
import MainLogo from "../components/assets/MainLogo.png";
import "./TopNav.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Link } from 'react-router-dom';


function TopNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      categoryDropdownRef.current &&
      !categoryDropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
      setShowCategoryDropdown(false);
    }
  };

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleCategoryDropdown = () => setShowCategoryDropdown((prev) => !prev);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(res => {
      if(res.data.status){
        console.log('Log out successful. Navigating to login page.');
        setTimeout(() => {
          navigate('/login')// Redirect to user dashboard
        }, 3000);
        
      }
    }).catch(err => {
      console.log(err);
      console.error('Error occurred during password reset:', err);
    })
  }

  return (
    <>
      <nav className="bg-white border-gray-200 text-gray-900 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={MainLogo} className="h-10" alt="Flowbite Logo" />
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse relative">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-1 mx-6 text-20 text-orange bg- font-semibold rounded-lg border border-grey transition duration-1000 ease-in-out bg-gray-900 text-white hover:text-white hover:bg-primary"
            >
              Log Out
            </button>

            <button
              type="button"
              className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
              id="user-menu-button"
              aria-expanded="false"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="userphoto" />
            </button>

            <div
              className={`z-50 absolute right-0 top-full mt-1 ${
                showDropdown ? "block animate-fade-in" : "hidden"
              } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg`}
              id="user-dropdown"
              ref={dropdownRef}
            >
              {/* User's dropdown list*/}
              <div className="px-4 py-3 font-medium">
                <span className="block text-sm text-gray-900">Bonnie Green</span>
                <span className="block text-sm text-gray-900">name@flowbite.com</span>
              </div>
              {/* user's menu items*/}
              <ul className="py-2 font-medium" aria-labelledby="user-menu-button">
                <li>
                  <a href="dash" className="block px-4 py-2 text-sm text-gray-700 hover:text-primary">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="set" className="block px-4 py-2 text-sm text-gray-700 hover:text-primary">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="ear" className="block px-4 py-2 text-sm text-gray-700 hover:text-primary">
                    Earnings
                  </a>
                </li>
                <li>
                  <a href="sout" className="block px-4 py-2 text-sm text-red-500">Sign out</a>
                </li>
              </ul>
            </div>

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between ${showMenu ? "" : "hidden"} w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
            ref={categoryDropdownRef}
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              {/* main navigation sections*/}
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-gray-900 md:dark:hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                {/* categories section (dropdown)*/}
                <button onClick={toggleCategoryDropdown} className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 ">
                  Categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
                </button>
                {/* dropdown list of the Categories*/}
                <div
                  className={`absolute right-0 left-0 mt-3 ${showCategoryDropdown ? "block animate-fade-in" : "hidden"} bg-white divide-y divide-gray-100 shadow-lg dark:divide-gray-600`}
                  id="mega-menu-full-dropdown"
                >
                  <div className="grid max-w-screen-md px-4 py-5 mx-auto text-gray-900 sm:grid-cols-2 md:px-6">
                    <ul>
                      <div className="justify-start">
                        {/* main category Western*/}
                        <button type="button" className=" group inline-flex w-fit items-center justify-left rounded-lg pl-2 py-4 text-lg font-semibold text-black transition-all duration-200 ease-in-out focus:shadow hover:bg-grey">Western<svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></button>
                      </div>
                      {/* sub categories*/}
                      <li><a href="#" className="flex p-3 py-2 justify-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150 items-center"><div className="font-semibold">Violins</div><span className="text-sm text-gray-500 dark:text-gray-400 pl-4">Violin, Cello</span></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Guitars</div><span className="text-sm text-gray-500 dark:text-gray-400 pl-4">Electric, Accoustic, Classic</span></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Drums</div><span className="text-sm text-gray-500 dark:text-gray-400 pl-4">Side Drum, Base Drum</span></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Keyboards</div><span className="text-sm text-gray-500 dark:text-gray-400 pl-4">Organ</span></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Trumpets</div></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Cajon Box</div></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Mouth Organs & Melodicas</div></a></li>
                    </ul>
                    <ul>
                      <div className="justify-start">
                        {/* main category Eastern*/}
                        <button type="button" className=" group inline-flex w-fit items-center justify-left rounded-lg pl-2 py-4 text-lg font-semibold text-black transition-all duration-200 ease-in-out focus:shadow hover:bg-grey">Eastern<svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></button>
                      </div>
                      {/* sub categories*/}
                      <li><a href="#" className="flex p-3 py-2 justify-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150 items-center"><div className="font-semibold">Bera</div><span className="text-sm text-gray-500 dark:text-gray-400 pl-4">Yakbera, Gatebera, Raban</span></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Conga</div></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Darbuka</div></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Djembe</div></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Hakgedi</div></a></li>
                      <li><a href="#" className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"><div className="font-semibold">Batanala</div></a></li>
                    </ul>
                  </div>
                </div>
              </li>

              {/* the rest of main navigation links*/}
              <li onClick={()=>(window.location.href='/personalizationsHome')}><a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900 md:dark:hover:bg-transparent">Personalizations</a></li>
              <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900 md:dark:hover:bg-transparent">Bulk Orders</a></li>
              <li><Link to = {'/rentals'}><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900 md:dark:hover:bg-transparent">Rentals</a></Link></li>
              <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900 md:dark:hover:bg-transparent">Repairs</a></li>
              <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900 md:dark:hover:bg-transparent">Company</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopNav;
