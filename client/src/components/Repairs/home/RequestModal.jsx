import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { GiGuitar } from 'react-icons/gi'; // Import GiGuitar icon
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaAlignLeft } from 'react-icons/fa';

const RequestModal = ({ request, onClose }) => {
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
        <h3 className='w-fit px-4 py-1 bg-orange-600 rounded-lg'>
          {request.issueType}
        </h3>
        {/* <h4 className='my-2 text-gray-500'>{request._id}</h4> */}
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-orange-600 text-2xl' />
          <h3 className='my-1'>{request.name}</h3>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-orange-600 text-2xl' />
          <h3 className='my-1'>{request.email}</h3>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <FaMapMarkerAlt className='text-orange-600 text-2xl' /> {/* Use GiGuitar icon */}
          <h3 className='my-1'>{request.address}</h3>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <GiGuitar className='text-orange-600 text-2xl' /> {/* Use GiGuitar icon */}
          <h3 className='my-1'>{request.instrumentCat}</h3>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <FaAlignLeft className='text-orange-600 text-2xl' /> {/* Use GiGuitar icon */}
          <h3 className='my-1'>{request.issueDescription}</h3>
        </div>
        <h3 className='my-2'>
        Guitar World Gold Coast specializes in guitar re-strings and setups. Our service
         ensures optimal playability, comfort, and sound quality. We adjust action, 
         intonation, and truss rod, replace strings, and offer personalized setups to 
         match your playing style.Ready to give your guitar the care it needs? Contact us today to schedule your repair or setup. Our friendly staff is here to answer At Guitar World Gold Coast, customer satisfaction is our priority. We strive to provide fast, reliable, and affordable services that  
          <b> Read more...</b>
        </h3>
      </div>
    </div>
  );
};

export default RequestModal;
