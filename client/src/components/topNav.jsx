import React, { useState, useEffect, useRef } from "react";
import MainLogo from "../components/assets/MainLogo.png";
import "./TopNav.css"; // Import the CSS file containing the animation styles

function TopNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };
  


  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };


  return (
    <nav className="bg-white border-gray-200 text-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={MainLogo} className="h-10" alt="Flowbite Logo" />
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse relative">
          <div className="relative">
            <div className="flex flex-row cart-img rounded-full items-center px-2 justify-center">
              <svg
                id="Shopping_Cart_24"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" stroke="none" fill="#000000" opacity="0" />
                <g transform="matrix(1.53 0 0 1.53 12 12)">
                  <path
                    transform=" translate(-7.55, -7.5)"
                    d="M 1 0.992188 L 1 1.992188 L 3 1.992188 C 3.214844 1.992188 3.398438 2.132813 3.46875 2.335938 L 4.402344 10.667969 C 4.488281 11.421875 5.136719 12 5.894531 12 L 12 12 L 12 11 L 5.894531 11 C 5.636719 11 5.425781 10.8125 5.398438 10.558594 L 5.335938 10 L 11.679688 10 C 12.390625 10 13.011719 9.492188 13.152344 8.796875 L 14.109375 4 L 4.660156 4 L 4.445313 2.09375 L 4.429688 2.046875 C 4.238281 1.421875 3.65625 0.996094 3 0.992188 Z M 11 12 C 10.449219 12 10 12.449219 10 13 C 10 13.550781 10.449219 14 11 14 C 11.550781 14 12 13.550781 12 13 C 12 12.449219 11.550781 12 11 12 Z M 6 12 C 5.449219 12 5 12.449219 5 13 C 5 13.550781 5.449219 14 6 14 C 6.550781 14 7 13.550781 7 13 C 7 12.449219 6.550781 12 6 12 Z M 4.773438 5 L 12.890625 5 L 12.171875 8.597656 C 12.121094 8.835938 11.921875 9 11.679688 9 L 5.222656 9 Z"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-1 mx-6 text-20 text-orange bg- font-semibold rounded-lg border border-grey transition duration-1000 ease-in-out bg-gray-900 text-white hover:text-white hover:bg-primary"
          >
            Log In
          </button>

          <button
            type="button"
            className="flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
            id="user-menu-button"
            aria-expanded="false"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
          </button>

          <div
            className={`z-50 absolute right-0 top-full mt-1 ${showDropdown ? "block animate-fade-in" : "hidden"
              } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg`}
            id="user-dropdown"
            ref={dropdownRef}
          >
            {/* User's dropdown list*/}
            <div className="px-4 py-3 font-medium">
              <span className="block text-sm text-gray-900">Bonnie Green</span>
              <span className="block text-sm  text-gray-900">name@flowbite.com</span>
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
                <a href="sout" className="block px-4 py-2 text-sm text-red-500 ">
                  Sign out
                </a>
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
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${showMenu ? "" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
          ref={categoryDropdownRef}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            {/* main navigation sections*/}
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-gray-900 md:dark:hover:text-primary "
              >
                Home
              </a>
            </li>
            <li>
              {/* categories section (dropdown)*/}
              <button
                onClick={toggleCategoryDropdown}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 "
              >
                Categories{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* dropdown list of the Categories*/}
              <div
                className={`absolute right-0 left-0 mt-3 ${showCategoryDropdown ? "block animate-fade-in" : "hidden"
                  } bg-white divide-y divide-gray-100 shadow-lg dark:divide-gray-600`}
                id="mega-menu-full-dropdown"
              >
                <div class="grid max-w-screen-md px-4 py-5 mx-auto text-gray-900 sm:grid-cols-2 md:px-6">
                  <ul>
                    <div class="justify-start">
                      {/* main category Western*/}
                      <button
                        type="button"
                        class=" group inline-flex w-fit items-center justify-left rounded-lg pl-2 py-4 text-lg font-semibold text-black transition-all duration-200 ease-in-out focus:shadow hover:bg-grey"
                      >
                        Western
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                    {/* sub categories*/}
                    <li>
                      <a
                        href="#"
                        className="flex p-3 py-2 justify-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150 items-center"
                      >
                        <div className="font-semibold">Violins</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 pl-4">Violin, Cello</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Guitars</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 pl-4">Electric, Accoustic, Classic</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Drums</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 pl-4">Side Drum, Base Drum</span>
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Keyboards</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 pl-4">Organ</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Trumpets</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Cajon Box</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Mouth Organs & Melodicas</div>
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <div class="justify-start">
                      {/* main category Eastern*/}
                      <button
                        type="button"
                        class=" group inline-flex w-fit items-center justify-left rounded-lg pl-2 py-4 text-lg font-semibold text-black transition-all duration-200 ease-in-out focus:shadow hover:bg-grey"
                      >
                        Eastern
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                    {/* sub categories*/}
                    <li>
                      <a
                        href="#"
                        className="flex p-3 py-2 justify-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150 items-center"
                      >
                        <div className="font-semibold">Bera</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 pl-4">
                          Yakbera, Gatebera, Raban
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Conga</div>
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Darbuka</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Djembe</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Hakgedi</div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-left py-2 items-center  p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-150"
                      >
                        <div className="font-semibold">Batanala</div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* the rest of main navigation links*/}
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900   md:dark:hover:bg-transparent"
              >
                Personalizations
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900    md:dark:hover:bg-transparent"
              >
                Bulk Orders
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900    md:dark:hover:bg-transparent"
              >
                Rentals
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900    md:dark:hover:bg-transparent"
              >
                Repairs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-gray-900   md:dark:hover:bg-transparent"
              >
                Company
              </a>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  );
}

export default TopNav;

