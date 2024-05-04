import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import PriceSingleCard from './PriceSingleCard';

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
   
      <script src="./js_files/main.js"></script> 
      
      <link rel="stylesheet" href="../style/bootstrap.min.css"></link>
      <link rel="stylesheet" href="../style/styleNew.css"></link>
      
      <section id="heroNew">
    <h2><b>Explore the world of Repair</b></h2>
    <br></br>
    <h4>Never take broken for an answer</h4>
    <p><b>We help thousands of people to repair their instruments every day.</b></p>
    <br></br>
    <button>Explore Our Repairs</button>
    
  </section>


      {/* works start */}
      <section id="works" className="works">
        <div className="container">
          <div className="section-header">
            <h2><b>Proudly Providing</b></h2>
            <h3>Best Quality Services</h3>
          </div>
          {/*/.section-header*/}
          <div className="works-content">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <img src="./images/service5.jpg" alt="" />
                  </div>
                  <h2>
                    <a href="#">
                      24/7 Availability
                    </a>
                  </h2>
                  <p>
                    Open service requests through our website any time of the day, and our experts will get back to you soon.
                  </p>
                  <button
                    className="welcome-hero-btn how-work-btn"
                    onClick={() => window.location.href='#'}
                  >
                    read more
                  </button>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <img src="./images/service4.jpg" alt="" />
                  </div>
                  <h2>
                    <a href="#">
                      Vast Network
                    </a>
                  </h2>
                  <p>
                    Our service centres and agents are distributed all over the island, making operations much easier.experts will get back to you soon.
                  </p>
                  <button
                    className="welcome-hero-btn how-work-btn"
                    onClick={() => window.location.href='#'}
                  >
                    read more
                  </button>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <img src="./images/service6.jpg" alt="" />
                  </div>
                  <h2>
                    <a href="#">
                      Prompt Service
                    </a>
                  </h2>
                  <p>
                    Get your installations, repairs and services done without hassle.Get your installations, repairs and services done without hassle.
                  </p>
                  <button
                    className="welcome-hero-btn how-work-btn"
                    onClick={() => window.location.href='#'}
                  >
                    read more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/.container*/}
      
      {/*/.works*/}
      {/* works end */}
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




</section>
      <section>
        <div className='row'>
          
          {prices.map((item) => (
            <div key={item._id} className="col-md-4 col-sm-6">
              <PriceSingleCard price={item} />
            </div>
          ))}
        </div>
      </section>
      
    </>
  );
};

export default PricesCard;
