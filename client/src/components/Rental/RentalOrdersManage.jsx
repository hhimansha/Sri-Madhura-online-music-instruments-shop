import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import logoImg from "../assets/MainLogo.png";

const RentalOrdersManage = () => {
    const [rentalOrders, setRentalOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRentalOrders = async () => {
            try {
              const response = await fetch('http://localhost:5050/api/rental-orders');
              if (!response.ok) {
                throw new Error('Failed to fetch rental orders');
              }
              const data = await response.json();
              setRentalOrders(data);
              setFilteredOrders(data);
              setLoading(false);
            } catch (error) {
              setError(error.message);
              setLoading(false);
            }
          };

        fetchRentalOrders();
    }, []);

    // Apply search query filter
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredOrders(rentalOrders); // If search query is empty, show all orders
        } else {
            const filtered = rentalOrders.filter(order => (
                order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.rentalItemID.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.title.toLowerCase().includes(searchQuery.toLowerCase())
            ));
            setFilteredOrders(filtered);
        }
    }, [searchQuery, rentalOrders]);

    const handleDelete = async (id) => {
        // Display confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return; // Cancel delete if user clicks "Cancel"

        // Perform delete operation if user confirms
        try {
            const response = await fetch(`http://localhost:5050/api/rental-orders/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete rental order');
            }

            // Update state to reflect deletion
            setRentalOrders(rentalOrders.filter(order => order._id !== id));
        } catch (error) {
            console.error('Error deleting rental order:', error.message);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        const logo = new Image();
        logo.src = logoImg;
        logo.onload = function () {
            doc.text('Rental Orders Details', 15, 18);
            doc.addImage(logo, 'PNG', 160, 10, 30, 11);

            doc.autoTable({
                startY: 28,
                head: [['ID', 'Rental Item ID', 'Title', 'Quantity', 'Total Price', 'Rental Date', 'Number of Days']],
                body: rentalOrders.map(({ _id, rentalItemID, title, quantity, totalPrice, rentalDate, numberOfDays }) => 
                    [_id, rentalItemID, title, quantity, totalPrice, rentalDate, numberOfDays]),
                columnStyles: {
                    0: { cellWidth: 30 },
                    1: { cellWidth: 30 },
                    2: { cellWidth: 50 },
                    3: { cellWidth: 20 },
                    4: { cellWidth: 20 },
                    5: { cellWidth: 20 },
                    6: { cellWidth: 20 }
                },
                margin: { top: 50 },
                styles: {
                    overflow: 'linebreak'
                },
                headStyles: {
                    fillColor: [255, 165, 0]
                },
                theme: 'striped'
            });

            doc.save('rentalOrders.pdf');
        };
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col max-w-[1280px] mx-auto my-6 ml-[280px]">
        <div className="flex mb-10 justify-between">
            <h1 className="text-2xl font-semibold leading-7 text-dark text-left">Manage Rental Orders</h1>
            <div className="flex">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primaryDark focus:border-transparent"
                />
                <button onClick={downloadPDF} className="items-center text-sm font-medium rounded-lg text-dark hover:bg-gray-200 p-2 px-3 flex mx-4">
                    Download Report
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
        <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                    <table id="rental-order-table" className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-gray-200 rounded-lg">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">ID</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Rental Item ID</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Order Date</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Title</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Quantity</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Total Price</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Rental Date</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Number of Days</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-start">
                            {filteredOrders.map((rentalOrder) => (
                                <tr key={rentalOrder._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{`...${rentalOrder._id.substring(rentalOrder._id.length - 3)}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{rentalOrder.rentalItemID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{new Date(rentalOrder.orderDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{rentalOrder.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{rentalOrder.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{`Rs.${rentalOrder.totalPrice}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{new Date(rentalOrder.rentalDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{rentalOrder.numberOfDays}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-red-500 p-1 px-2 text-red-500 hover:text-white hover:bg-red-600" onClick={() => handleDelete(rentalOrder._id)}>Cancel</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
};

export default RentalOrdersManage;
