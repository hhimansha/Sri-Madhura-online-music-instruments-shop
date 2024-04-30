import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import RequestsTable from '../Repairs/home/RequestsTable';
import RequestsCard from '../Repairs/home/RequestsCard';
import TopNav from '../topNav';
import Footer from '../Footer';

export const Home = () => {
    const [repair, setRepair] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5050/repair`)
            .then((response) => {
                setRepair(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    }, []);

    return (<>
    <TopNav/>
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
  <button
    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
    onClick={() => setShowType('table')}
    style={{ backgroundColor: '#de6418', color: '#fff' }}
  >
    Admin
  </button>
  <button
    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
    onClick={() => setShowType('card')}
    style={{ backgroundColor: '#de6418', color: '#fff' }}
  >
    User
  </button>


            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Requests List</h1>
                <Link to='/repair/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? <Spinner /> : showType === 'table' ? <RequestsTable repair={repair} /> : <RequestsCard repair={repair} />}
        </div>
        <Footer/>
        </>
    );
};

export default Home;
