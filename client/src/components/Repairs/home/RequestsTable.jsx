import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RequestsTable = ({ repair }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredRepairs = repair.filter((request) =>
    request.instrumentCat.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.status.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter((request) =>
    statusFilter === '' || request.status.toLowerCase() === statusFilter.toLowerCase()
  );

  const saveAsPDF = () => {
    // Create new jsPDF instance
    const doc = new jsPDF();

    // Define columns for the table
    const columns = ['No', 'Customer id', 'Name', 'Email', 'Address', 'Date', 'Instrument', 'Instrument Category', 'Brand', 'Warranty', 'Issue Type', 'Price', 'Issue Description', 'Status'];

    // Map repair data to rows
    const rows = repair.map((request, index) => [
      index + 1,
      request.cID,
      request.name,
      request.email,
      request.address,
      request.date,
      request.instrumentCat,
      request.instrumentBrand,
      request.brand,
      request.warranty,
      request.issueType,
      request.price,
      request.issueDescription,
      request.status
    ]);

    // Add a page to the PDF
    doc.addPage();

    // Add table to the PDF
    doc.autoTable(columns, rows);

    // Save the PDF
    doc.save('repair_details.pdf');
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by instrument name"
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
        <select
          className="border border-gray-400 py-2 px-4 rounded-md ml-4"
          style={{
            backgroundColor: '#f0f0f0',
            color: '#333',
            borderRadius: '0.25rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
          <option value='50% Completed'>50% Completed</option>
          <option value='75% Completed'>75% Completed</option>
        </select>

        <div className="flex-grow"></div> {/* This adds space between the input field and the button */}

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
      <div className="overflow-x-auto">
        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr className="bg-black text-white">
              <th className='border border-black-600 py-3 px-4 w-10'>No</th>
              <th className='border border-black-600 py-3 px-4'>Name</th>
              <th className='border border-black-600 py-3 px-4'>Email</th>
              <th className='border border-black-600 py-3 px-4'>Address</th>
              <th className='border border-black-600 py-3 px-4'>Date</th>
              <th className='border border-black-600 py-3 px-4'>Instrument</th>
              <th className='border border-black-600 py-3 px-4'>Instrument Category</th>
              <th className='border border-black-600 py-3 px-4'>Brand</th>
              <th className='border border-black-600 py-3 px-4'>Warranty</th>
              <th className='border border-black-600 py-3 px-4'>Issue Type</th>
              <th className='border border-black-600 py-3 px-4'>Price</th>
              <th className='border border-black-600 py-3 px-4'>Issue Description</th>
              <th className='border border-black-600 py-3 px-4'>Status</th>
              <th className='border border-black-600 py-3 px-4 w-20'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredRepairs.map((request, index) => (
              <tr key={request._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className='border border-gray-400 py-3 px-4 text-center'>{index + 1}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.name}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.email}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.address}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.date}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.instrumentCat}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.instrumentBrand}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.brand}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.warranty}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.issueType}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.price}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.issueDescription}</td>
                <td className='border border-gray-400 py-3 px-4'>{request.status}</td>
                <td className='border border-gray-400 py-3 px-4'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/repair/details/${request._id}`} className='text-blue-600 hover:text-blue-800'>
                      <BsInfoCircle className='text-xl' />
                    </Link>
                    <Link to={`/repair/edit/${request._id}`} className='text-yellow-600 hover:text-yellow-800'>
                      <AiOutlineEdit className='text-xl' />
                    </Link>
                    <Link to={`/repair/delete/${request._id}`} className='text-red-600 hover:text-red-800'>
                      <MdOutlineDelete className='text-xl' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {/* Button to navigate to send-mail route */}
        <br></br>
        <Link to="/send-email">
          <button
            style={{
              backgroundColor: '#de6418',
              color: '#333',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Send Mail
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RequestsTable;
