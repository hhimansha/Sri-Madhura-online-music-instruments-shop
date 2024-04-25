import React from "react";
import wide from '../assets/wideHero.png';

function RentHomePage() {
    return (

        
<header> {/* Container */} <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-28 lg:py-28">
    <div className="mx-auto max-w-3xl text-center"> {/* Title */} <h1 className="mb-6 text-4xl font-bold md:text-6xl">Rent Your Path to<br/>Musical Excellence Today</h1>
      <p className="mb-6 text-sm text-[#636262] sm:text-xl lg:mb-8">Browse instruments, choose your favorite, and begin your musical journey today with our easy renting process. Start playing now!</p>
       {/* Button */} 
       <a href="#" className="mr-6 inline-block items-center rounded-md shadow-[0px_4px_10px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] bg-primary px-8 py-4 text-center font-semibold text-white lg:mr-8">Rent Instruments</a>
    </div> {/* List */} 
    <div><img src={wide} className="w-fit mx-auto mt-4"></img></div>
    <ul className="py-10 grid gap-8  sm:grid-cols-3 sm:gap-12 md:grid-cols-5 md:gap-4 shadow-xl rounded-3xl">

      <li className="flex justify-center">
        <img src="https://1000logos.net/wp-content/uploads/2020/06/Yamaha-Logo.png" alt="" className="inline-block" />
      </li>
      <li className="flex justify-center">
        <img src="https://1000marcas.net/wp-content/uploads/2020/02/Logo-Ibanez-1280x800.png" alt="" className="inline-block" />
      </li>
      <li className="flex justify-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Koll_guitar_co_logo.png" alt="" className="inline-block " />
      </li>
      <li className="flex justify-center">
        <img src="https://1000marcas.net/wp-content/uploads/2020/02/Logo-Ibanez-1280x800.png" alt="" className="inline-block" />
      </li>
      <li className="flex justify-center">
        <img src="https://1000logos.net/wp-content/uploads/2020/06/Yamaha-Logo.png" alt="" className="inline-block" />
      </li>
    </ul>
    
  </div>
  
</header>
    );
}

export default RentHomePage;