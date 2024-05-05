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
        <h4 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
          {request.issueType}
        </h4>
        {/* <h4 className='my-2 text-gray-500'>{request._id}</h4> */}
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h4 className='my-1'>{request.name}</h4>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h4 className='my-1'>{request.email}</h4>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <FaMapMarkerAlt className='text-red-300 text-2xl' /> {/* Use GiGuitar icon */}
          <h4 className='my-1'>{request.address}</h4>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <GiGuitar className='text-red-300 text-2xl' /> {/* Use GiGuitar icon */}
          <h4 className='my-1'>{request.instrumentCat}</h4>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <FaAlignLeft className='text-red-300 text-2xl' /> {/* Use GiGuitar icon */}
          <h4 className='my-1'>{request.issueDescription}</h4>
        </div>
        <h4 className='my-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
          voluptatum sint. 
          <b> Read more...</b>
        </h4>
      </div>
    </div>
  );
};

export default RequestModal;
