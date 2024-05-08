import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../Repairs/BackButton';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../assets/MainLogo.png';


const ShowRequest = () => {
  const [request, setRequest] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5050/repair/${id}`)
      .then((response) => {
        setRequest(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const generatePDF = () => {
    const doc = new jsPDF();
   

  doc.addImage(logo, 'PNG', 150, 10, 40, 40); 

  doc.setFontSize(18);
  doc.text(20, 30, `Dear ${request.name},`);
  doc.setFontSize(12);
  doc.text(20, 45, 'Thank you for choosing our repair service.');
  doc.text(20, 55, 'Please find attached details of your repair request.');
  doc.text(20, 65, 'Repair ID is mentioned below in this document.');
  doc.text(20, 75, 'If you have any questions or concerns, feel free to contact us.');
  
     
doc.text(20, 100, `ID: ${request._id}`);
doc.text(20, 110, `Name: ${request.name}`);
doc.text(20, 120, `Email: ${request.email}`);
doc.text(20, 130, `Address: ${request.address}`);
doc.text(20, 140, `Date: ${request.date}`);
doc.text(20, 150, `Instrument : ${request.instrumentCat}`);
doc.text(20, 160, `Instrument Category: ${request.instrumentBrand}`);
doc.text(20, 170, `Instrument Brand: ${request.brand}`);
doc.text(20, 180, `Waranty: ${request.warranty}`);
doc.text(20, 190, `Issue Type: ${request.issueType}`);
doc.text(20, 200, `Issue Description: ${request.issueDescription}`);



    // Save the PDF
    doc.save('show_request_details.pdf');
  };

  return (
    <div style={{ 
      backgroundImage: "url('/images/repairB4.jpeg')", 
      backgroundSize: 'cover', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px' 
    }}>
      <div className='max-w-2xl mx-auto' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
        <BackButton />
        <h1 className='text-3xl font-bold mb-6' style={{ color: '#000' }}>Show Request</h1>
  
        <div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Id:</span>
            <span>{request._id}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Name:</span>
            <span>{request.name}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Email:</span>
            <span>{request.email}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Address:</span>
            <span>{request.address}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Date:</span>
            <span>{request.date}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Instrument:</span>
            <span>{request.instrumentCat}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Instrument Category:</span>
            <span>{request.instrumentBrand}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Instrument Brand:</span>
            <span>{request.brand}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Warranty:</span>
            <span>{request.warranty}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Issue Type:</span>
            <span>{request.issueType}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Issue Description:</span>
            <span>{request.issueDescription}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Create Time:</span>
            <span>{new Date(request.createdAt).toString()}</span>
          </div>
          <div className='mb-4'>
            <span className='text-gray-700 font-bold mr-4'>Last Update Time:</span>
            <span>{new Date(request.updatedAt).toString()}</span>
          </div>
          <div>
  <Link to="/send-email" style={{ marginRight: '10px' }}>
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
  <button
    onClick={generatePDF}
    style={{
      backgroundColor: '#de6418',
      color: '#333',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    Download as PDF
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default ShowRequest;
