import React from "react";

function RentHomePage() {
  return (
    
		<header> {/* Hero Container */} <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32"> {/* Component */} <div className="mx-auto mb-8 w-full max-w-3xl text-center md:mb-12 lg:mb-16"> {/* Hero Title */} <h1 className="mb-4 text-4xl font-bold md:text-6xl"> The Website You Want Without The Dev Time. </h1>
        <p className="mx-auto mb-6 max-w-lg text-base text-[#636262] md:mb-10 lg:mb-12"> Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus </p> {/* Hero Button */} <div className="flex items-center justify-center">
          <a href="#" className="mr-5 flex items-center bg-[#276ef1] px-8 py-4 font-semibold text-white transition [box-shadow:rgb(171,_196,245)-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] md:mr-6 lg:mr-8">
            <p className="mr-6 font-bold">Get Started</p>
            <svg fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-none">
              <title>Arrow Right</title>
              <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
            </svg>
          </a>
          <a href="#" className="flex font-bold">
            <p className="text-black">View Showreel</p>
            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357752f71727ed3edf9213b_Vector (5).svg" alt="" className="ml-2 inline-block" />
          </a>
        </div>
      </div> {/* Hero Image */}
      <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635b53f37e968a0517a786f7_Mask group.png" alt="" className="inline-block max-h-[512px] w-full object-cover" />
    </div>
  </header>
  );
}

export default RentHomePage;