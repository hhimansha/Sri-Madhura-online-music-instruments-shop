import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { FaAlignLeft } from 'react-icons/fa';
import { GiGuitar } from 'react-icons/gi';
import { FaTools } from 'react-icons/fa';
import { FaStickyNote } from 'react-icons/fa';
const PriceModal = ({ price, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
      <br></br>
        <div className='flex justify-start items-center gap-x-2'>
          < GiGuitar className='text-orange-600 text-2xl' />
          <h5 className='my-1'>{price.Ninstrument}</h5>
        </div>
        <br></br>
       
        <div className='flex justify-start items-center gap-x-2'>
          <FaTools className='text-orange-600 text-2xl' />
          <h5 className='my-1'>{price.issueType2}</h5>
        </div>
        <br></br>
        
        <div className='flex justify-start items-center gap-x-2'>
          <FaStickyNote className='text-orange-600 text-2xl' />
          <h5 className='my-1'>{price.issueDetail}</h5>
        </div>
        <br></br>
        
        <h5 className='mt-4'>More about this..</h5>
        <p className='my-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
          voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
          necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
          nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
          dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
          vitae voluptate sequi repellat!
        </p>
      </div>
    </div>
  );
};

export default PriceModal;