import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spin from './Spin';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import PricesTable from './home/PricesTable';
import PricesCard from './home/PricesCard';

export const DetailsHomeUser = () => {
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
            

           

            </div>
          
            {loading ? <Spin /> : showType === 'card' ? <PricesTable prices={prices} /> : <PricesCard prices={prices} />}
        </div>
       
        </>
    );
};

export default DetailsHomeUser;
