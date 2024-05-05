import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderTable = ({ suprequests }) => {

  const saveAsPDF = () => {
    const doc = new jsPDF();

    // Define columns
    const columns = ['No', 'Instrument', 'Type', 'Brand', 'Quantity'];

    // Define rows
    const rows = suprequests.map((suprequest, index) => [index + 1, suprequest.instrument, suprequest.type, suprequest.brand, suprequest.quantity]);

    // Add a page to the PDF
  doc.addPage();

    // Create table
    doc.autoTable(columns, rows);

    // Save the PDF
    doc.save('instrument_details.pdf');
  };

  return (
    <div>
      {/* Button to navigate to send-mail route */}
      <Link to="/send-email">
        <button
        className='bg-orange-500 hover:bg-orange-700 px-4 py-1 rounded-lg'>Send Mail</button>
      </Link>
      
       <br/>  <br/>
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='border border-slate-600 rounded-md '>No</th>
            <th className='border border-slate-600 rounded-md'>Instrument</th>
            <th className='border border-slate-600 rounded-md '>Type</th>
            <th className='border border-slate-600 rounded-md '>Brand</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>
              Quantity
            </th>
            <th className='border border-slate-600 rounded-md'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {suprequests.map((suprequest, index) => (
            <tr key={suprequest._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>
                {index + 1}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                {suprequest.instrument}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                {suprequest.type}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                {suprequest.brand}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {suprequest.quantity}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/suprequest/details/${suprequest._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/suprequest/edit/${suprequest._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                  </Link>
                  <Link to={`/suprequest/delete/${suprequest._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br/>  <br/>
      <div>
      <button
      className='bg-orange-500 hover:bg-orange-700 px-4 py-1 rounded-lg'
       onClick={saveAsPDF}>Save as PDF</button>
    </div>
    </div>


  );
};

export default OrderTable;
