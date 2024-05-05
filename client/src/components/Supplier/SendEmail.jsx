import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [message, setMessage] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [sentMessage, setSentMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('receiverEmail', receiverEmail);
    formData.append('message', message);
    if (pdfFile) {
      formData.append('pdfFile', pdfFile);
    }

    try {
      await axios.post('http://localhost:5050/send-email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSentMessage('Email sent successfully');
      setReceiverEmail('');
      setMessage('');
      setPdfFile(null);
    } catch (error) {
      setError('Error sending email');
    }
  };

  return (
    <>
    
    <link rel="stylesheet" type="text/css" href="../styles/emailStyle.css"/>
    < br/> < br/> < br/>
    <div className="container">
    <h1 className='text-3xl my-4'>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Supplier's Email:</label>
          <input type="email" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        </div>
        <div className="input-group">
          <label>Attach Order PDF:</label>
          <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
        </div>
        <button className='p-2 bg-orange-500 m-100' type="submit">Send Email</button>
      </form>
      {sentMessage && <p className="message success">{sentMessage}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
    </>
  );
}

export default App;
