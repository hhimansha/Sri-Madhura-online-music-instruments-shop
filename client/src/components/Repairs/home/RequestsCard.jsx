
import RequestSingleCard from './RequestSingleCard';

import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';



const RequestsCard = ({ repair }) => {
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
 
    <script src="./js_files/main.js"></script> 
    
    <link rel="stylesheet" href="../style/style.css"></link>
    <section id="heroNew">
  <h2><b>Explore the world of Repair</b></h2>
  <br></br>
  <h5>Never take broken for an answer</h5>
  <br></br>
  <p><b>We help thousands of people to repair their instruments every day.</b></p>
  <br></br>
  <button>Explore Our Repairs</button>

  
</section>
<section class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-xl px-4 md:px-8">
  <h2 class="-mx-4 px-4 pt-4 pb-6 text-3xl text-blue-900 sm:text-4xl xl:text-5xl">Our <span class="font-bold">Growth</span></h2>
    

    <div class="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-16">
      
   
      <article class="">
        <a class="block rounded-lg bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 p-2 transition hover:scale-105" href="#">
        <h2 class="mx-4 mt-4 mb-10 font-serif text-2xl font-semibold text-white">50+ Years Of
Experience</h2>
          
            <p class="ml-4 w-56">
              <strong class="block text-lg font-medium text-white">Since the days of Sri Lanka's closed economy, the founder of Sri Madhura Group, Mrs. Aban Pestonjee, used to buy used appliances from embassy auctions. She would repair these appliances and sell them</strong>
              
            </p>
            
       
        </a>
      </article>
    
      <article class="">
        <a class="block rounded-lg bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 p-2 transition hover:scale-105" href="#">
          <h2 class="mx-4 mt-4 mb-10 font-serif text-2xl font-semibold text-white">We Deliver
Quality Serivces</h2>
          <div class="flex items-center rounded-md px-4 py-3">
            
            <p class="ml-4 w-56">
              <strong class="block text-lg font-medium text-white">At Sri Madura Musical instrumental shop, our team consists of well-trained, competent individuals dedicated to providing superior service.</strong>
              
            </p>
          </div>
        </a>
      </article>
      
      <article class="">
        <a class="block rounded-lg bg-gradient-to-r from-purple-500 via-indigo-400 to-indigo-400 p-2 transition hover:scale-105" href="#">
          <h2 class="mx-4 mt-4 mb-10 font-serif text-2xl font-semibold text-white">Why Choose Us?</h2>
          <div class="flex items-center rounded-md px-4 py-3">
            
            <p class="ml-4 w-56">
              <strong class="block text-lg font-medium text-white">The Sri Mahura Team comprises a group of well-trained and highly competent individuals - dedicated to always providing great service. Fast, efficient and reliable</strong>
             
            </p>
          </div>
        </a>
      </article>
      
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
    My Repairs
</h1>

    
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {repair.map((item) => (
        <RequestSingleCard key={item._id} request={item} />
      ))}
    </div>
    
    </>
  );
};


export default RequestsCard;

