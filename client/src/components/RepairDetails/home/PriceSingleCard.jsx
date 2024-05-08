import { useState } from 'react';
import PriceModal from './PriceModal';
import { BiUserCircle, BiShow } from 'react-icons/bi';

const PriceSingleCard = ({ price }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div class="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
      <a class="relative flex h-60 overflow-hidden" href="#">
        <img class="absolute top-0 right-0 h-full w-full object-cover" src={price.RimageBase64} alt="product image" />
        
        <div class="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
          <div class="h-3 w-3 rounded-full border-2 border-white bg-white"></div>
          <div class="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div>
          <div class="h-3 w-3 rounded-full border-2 border-white bg-transparent"></div> 
        </div>
        
      </a>
      <div class="mt-4 px-5 pb-5">
        <a href="#">
          <h5 class="text-2xl font-bold text-slate-900">{price.issueType2}</h5>
        </a>
        
        <div class="mt-2 mb-5 flex items-center justify-between">
          <p className="text-xl tracking-tight text-slate-900">{price.issueDetail}</p>
          <p class="text-2xl font-bold text-slate-900">{price.fprice}</p>
        </div>
        <button class="flex items-center justify-center bg-orange-500 px-2 py-1 text-sm text-white transition hover:bg-orange-700">
        { <BiShow
            className='text-3xl text-black-800 hover:text-black cursor-pointer'
            onClick={() => setShowModal(true)}
          /> }
        Show more
    </button>
        
      </div>
      {showModal && <PriceModal price={price} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default PriceSingleCard;
