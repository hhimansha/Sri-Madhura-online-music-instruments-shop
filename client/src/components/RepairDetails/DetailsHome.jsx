import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spin from './Spin';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import PricesTable from './home/PricesTable';
import PricesCard from './home/PricesCard';

export const DetailsHome = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5050/prices')
            .then((response) => {
                setPrices(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    }, []);

    return (<>
        
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
            <button
            className='hover:bg-sky-600 px-4 py-1 rounded-lg'
            style={{ backgroundColor: '#de6418' }}
            onClick={() => setShowType('table')}
            >
            Admin
            </button>

            <button
            className='hover:bg-sky-600 px-4 py-1 rounded-lg'
            style={{ backgroundColor: '#de6418' }}
            onClick={() => setShowType('card')}
            >
             User
            </button>

            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Details List</h1>
                <Link to='/prices/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? <Spin /> : showType === 'table' ? <PricesTable prices={prices} /> : <PricesCard prices={prices} />}
        </div>
       
        </>
    );
};

export default DetailsHome;
