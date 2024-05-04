import { Link } from 'react-router-dom';
import ItemSingleCard from './ItemSingleCard';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ItemCard = ({ sellitems }) => {
  return (
    <>
    
    <meta charSet="UTF-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 
  <link
    rel="stylesheet"
    href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
  />
  <script src="./js_files/main.js"></script> 
  <link rel="stylesheet" href="../styles/main.css" />
  {/*-----------------------Font Awesome Icons -------------*/}
  {/*--------x---------------Font Awesome Icons --------x-----*/}
  {/*--------x---------------Google font --------x-----*/}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Alkatra&family=Berkshire+Swash&family=Comic+Neue:wght@700&family=Gentium+Book+Plus:wght@400;700&family=Lato:ital,wght@0,400;0,700;0,900;1,700&family=Lexend+Deca:wght@500&family=Lexend:wght@500&family=Montserrat:wght@500&family=Open+Sans:wght@500;800&family=Roboto:wght@100;400&family=Sue+Ellen+Francisco&family=Work+Sans:wght@400;700;900&display=swap"
    rel="stylesheet"
  />
  <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@100;200;300;400;500;600;700;800;900;&display:swap" />
  {/*--------x---------------Google font --------x---------------*/}
  <section id="hero">
    <h2>Make money selling on Sri Madura</h2>
    <h4>Sell your items fast</h4>
    <h4>Our shop is waiting to buy</h4>
    <p>Save more with coupons and up to 70% off!</p>
    <button>
        <Link to='/sellItem/create'>
          List an Item
        </Link>
      </button>
  </section>
<br />
  <h3>Create A Great Listing</h3>
  <section id="feature" className="section-p1">
    <div className="fe-box">
      <img src="https://i.postimg.cc/PrN2Y6Cv/f1.png" alt="" />
      <h6>Write a standout title</h6>
    </div>
    <div className="fe-box">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/000/673/417/small_2x/businessman_take_a_photograph_with_digital_camera.jpg"
        alt=""
      />
      <h6>Take high-quality photos</h6>
    </div>
    <div className="fe-box">
      <img
        src="https://cdn2.vectorstock.com/i/1000x1000/41/41/woman-consumer-character-making-purchase-online-vector-38704141.jpg"
        alt=""
      />
      <h6>Pick a purchase format</h6>
    </div>
    <div className="fe-box">
      <img src="https://i.postimg.cc/GpYc2JFZ/f4.png" alt="" />
      <h6>Set the right price</h6>
    </div>
    <div className="fe-box">
      <img src="https://i.postimg.cc/4yFCwmv6/f5.png" alt="" />
      <h6>Stand out from the crowd</h6>
    </div>
    <div className="fe-box">
      <img src="https://i.postimg.cc/gJN1knTC/f6.png" alt="" />
      <h6>Ship with ease</h6>
    </div>
  </section>
<h1>Your Sellng instruments</h1>
<section>

    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {sellitems.map((sellItem) => (
        <ItemSingleCard key={sellItem._id} sellItem={sellItem} />
      ))}
    </div>
    </section>
    </>
  );
};

export default ItemCard;