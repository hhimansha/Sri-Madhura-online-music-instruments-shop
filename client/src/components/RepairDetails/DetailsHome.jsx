import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNav from '../topNav';
import Footer from '../Footer';
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
      <TopNav/>  
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
            

           

            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Details List</h1>
                <Link to='/prices/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            { showType === 'table' ? <PricesTable prices={prices} /> : <PricesCard prices={prices} />}
        </div>
        <Footer/>
        
       
        </>
    );
};

export default DetailsHome;
