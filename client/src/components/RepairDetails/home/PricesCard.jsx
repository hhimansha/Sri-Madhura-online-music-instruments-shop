
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import PriceSingleCard from './PriceSingleCard';
import React from 'react';
import { Link } from 'react-router-dom';


const PricesCard = ({ prices }) => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Instruments</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  body {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n    margin: 0;\n    padding: 0;\n  }\n  .container {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 20px;\n  }\n  .topic-heading {\n    font-size: 24px;\n    font-weight: bold;\n    margin-bottom: 10px;\n  }\n  .instrument-card {\n    background-color: #fff;\n    border-radius: 8px;\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    padding: 20px;\n    margin-bottom: 20px;\n    display: flex;\n    align-items: center;\n  }\n  .instrument-image {\n    width: 120px;\n    height: 120px;\n    border-radius: 8px;\n    margin-right: 20px;\n  }\n  .instrument-details {\n    flex: 1;\n  }\n  .instrument-details h2 {\n    margin-top: 0;\n    margin-bottom: 10px;\n    font-size: 20px;\n    color: #333;\n  }\n  .instrument-details p {\n    margin: 0;\n    font-size: 16px;\n    color: #666;\n  }\n  .price {\n    font-weight: bold;\n    font-size: 18px;\n    color: #333;\n  }\n  .issue {\n    font-style: italic;\n    color: #888;\n  }\n  .header {\n    background-image: url('./images/header-background.jpg');\n    background-size: cover;\n    background-position: center;\n    color: #fff;\n    padding: 50px 0;\n  }\n"
        }}
      />
   <link rel="stylesheet" href="../style/styleNew.css"></link> 
   
      <section id="heroNew">
    <h2><b>Explore the world of Repair</b></h2>
    <br></br>
    <h4>Never take broken for an answer</h4>
    <p><b>We help thousands of people to repair their instruments every day.</b></p>
    <br></br>
    <button>
        <Link to='/repair/homeUser'>Explore My Repairs</Link>
      </button>
    
  </section>


  <section class="py-20">
  <div class="mx-auto max-w-md px-4 md:max-w-2xl lg:max-w-screen-lg">
    <h1 class="mb-12 text-center text-5xl font-bold">About Our Services</h1>
    <div class="mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <div class="flex flex-col overflow-hidden rounded shadow-md">
        <img src="../images/repair2.jpg" class="h-56 w-full object-cover" />
        <div class="p-4">
          <span class="mb-1 block text-xs font-medium uppercase text-gray-600">White Paper</span>
          <h5 class="font-medium">5 Keys to Financial Operations Excellence</h5>
        </div>
      </div>
      <div class="flex flex-col overflow-hidden rounded shadow-md">
        <img src="../images/repair1.jpg" class="h-56 w-full object-cover" />
        <div class="p-4">
          <span class="mb-1 block text-xs font-medium uppercase text-gray-600">White Paper</span>
          <h5 class="font-medium">5 Keys to Financial Operations Excellence</h5>
        </div>
      </div>
      <div class="flex flex-col overflow-hidden rounded shadow-md">
        <img src="../images/repair3.jpg" class="h-56 w-full object-cover" />
        <div class="p-4">
          <span class="mb-1 block text-xs font-medium uppercase text-gray-600">White Paper</span>
          <h5 class="font-medium">5 Keys to Financial Operations Excellence</h5>
        </div>
      </div>
    </div>
   
  </div>
</section>


      <h1 style={{ 
    fontSize: '4.5rem',  
    fontWeight: 'bold',  
    color: '#333',    
    textAlign: 'center',
    margin: '2rem 0',    
    letterSpacing: '0.1rem',    
    textTransform: 'uppercase', 
    borderBottom: '2px solid #333', 
    paddingBottom: '0.5rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' /* Add a text shadow */
}}>
    Repairs
</h1>






        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {prices.map((item) => (
            
              <PriceSingleCard key={item._id} price={item} />
            
          ))}
        </div>
      
     
      
    </>
  );
};

export default PricesCard;
