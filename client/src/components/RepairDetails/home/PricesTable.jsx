import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PricesTable = ({ prices }) => {
    const [searchQuery, setSearchQuery] = useState('');

  // Filter sellitems based on searchQuery
  const filteredPrices = prices.filter((price) =>
    price.Ninstrument.toLowerCase().includes(searchQuery.toLowerCase())||
    price.issueType2.toLowerCase().includes(searchQuery.toLowerCase())
    
  );
    const saveAsPDF = () => {
        const doc = new jsPDF();

        // Define columns
        const columns = ['No', 'Instrument', 'Issue Type', 'Issue Detail', 'Price'];

        // Define rows
        const rows = prices.map((price, index) => [
            index + 1,
            price.Ninstrument,
            price.issueType2,
            price.issueDetail,
            price.fprice
        ]);

        // Add a page to the PDF
        doc.addPage();

        // Create table
        doc.autoTable(columns, rows);

        // Save the PDF
        doc.save('prices_details.pdf');
    };

    return (
        <div>
 <div className="flex items-center mb-4">
  <input
    type="text"
    placeholder="Search by instrument name.."
    className="border border-gray-400 py-2 px-4 rounded-md"
    style={{
      width: '300px',
      backgroundColor: '#f0f0f0',
      color: '#333',
      borderRadius: '0.25rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  
  
  <div className="flex-grow"></div> 
  
  <button
    className='flex items-center hover:bg-sky-600 px-4 py-1 rounded-lg'
    style={{ backgroundColor: '#de6418' }}
    onClick={saveAsPDF}
  >
    <FaDownload className="mr-2" />
    Download as PDF
  </button>
</div>

            <br></br>
            <br></br>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                    <th style={{ backgroundColor: '#e6e6e6' }} className='border border-slate-600 rounded-md'>No</th>
<th style={{ backgroundColor: '#e6e6e6' }} className='border border-slate-600 rounded-md'>Image</th>
<th style={{ backgroundColor: '#e6e6e6' }} className='border border-slate-600 rounded-md'>Instrument</th>
<th style={{ backgroundColor: '#e6e6e6' }} className='border border-slate-600 rounded-md'>Issue Type</th>
<th style={{ backgroundColor: '#e6e6e6' }} className='border border-slate-600 rounded-md'>Issue Detail</th>
<th style={{ backgroundColor: '#e6e6e6' }} className='border border-slate-600 rounded-md'>Price</th>
<th style={{ backgroundColor: '#e6e6e6' }} className='border border-slate-600 rounded-md'>Operations</th>


                    </tr>
                </thead>
                <tbody>
                    {filteredPrices.map((price, index) => (
                        <tr key={price._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {/* Render the image */}
                                <img src={`${price.RimageBase64}`} className='h-10 w-10 object-cover' alt={`Price ${index + 1}`} />
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>{price.Ninstrument}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{price.issueType2}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{price.issueDetail}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{price.fprice}</td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/prices/show/${price._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800' />
                                    </Link>
                                    <Link to={`/prices/edit/${price._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                                    </Link>
                                    <Link to={`/prices/delete/${price._id}`}>
                                        <MdOutlineDelete className='text-2xl text-red-600' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PricesTable;
