import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/MainLogo.png";
import jsPDF from "jspdf";
import "jspdf-autotable";

const UserManage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5050/api/users/');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        // Filter users based on search term
        const filtered = users.filter(user => {
            return user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) //||
               // user.email.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const handleDelete = async (id) => {
        // Display confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return; // Cancel delete if user clicks "Cancel"

        // Perform delete operation if user confirms
        try {
            const response = await fetch(`http://localhost:5050/api/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            // Update state to reflect deletion
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();


        doc.text('User Management Report', 15, 18); // Adjust the text position as needed

        // Table headers
        const headers = ['ID', 'Name', 'Email'];

        // Table data
        const data = users.map(user => [user._id, `${user.firstname} ${user.lastname}`, user.email]);

        // Add table using autotable plugin
        doc.autoTable({
            head: [headers],
            body: data,
        });

        // Save the PDF
        doc.save('userManagementReport.pdf');
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
                <h1 className="text-2xl font-semibold leading-7 text-dark text-left">Manage Users</h1>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-md px-2 py-1"
                    />
                    <button onClick={downloadPDF} className="items-center text-sm font-medium rounded-lg text-dark hover:bg-gray-200 p-2 px-3 flex ">
                        Download Report
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </span>
                    </button>
                    <Link to={'/admindash/users/usercreate'}>
                        <button type="button" className="items-center text-sm font-medium rounded-lg text-white bg-primary hover:bg-primaryDark p-2 flex mx-4 px-3">Add New User<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 font ml-1">
                            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                        </svg></span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table id="user-table" className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-gray-200 rounded-lg">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">ID</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Name</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Email</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-start">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.firstname} {user.lastname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                            <Link to={`/admindash/users/update/${user._id}`}>
                                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white bg-dark p-1 px-2 disabled:opacity-50 disabled:pointer-events-none mr-4">View</button>
                                            </Link>
                                            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-red-500 p-1 px-2 text-red-500 hover:text-white hover:bg-red-600" onClick={() => handleDelete(user._id)}>Delete</button>
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

export default UserManage;
