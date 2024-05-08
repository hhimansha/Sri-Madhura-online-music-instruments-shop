import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogManage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5050/blog');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        // Display confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return; // Cancel delete if user clicks "Cancel"

        // Perform delete operation if user confirms
        try {
            const response = await fetch(`http://localhost:5050/blog/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete blog');
            }

            // Update state to reflect deletion
            setBlogs(blogs.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col max-w-[1280px] mx-auto my-6 ml-[280px]">
            <div className="flex mb-10 justify-between items-center">
                <h1 className="text-2xl font-semibold leading-7 text-dark text-left">Manage Blogs</h1>
                <div className="flex">
                    <Link to={'/admindash/blogs/create'}>
                        <button type="button" className="items-center text-sm font-medium rounded-lg text-white bg-primary hover:bg-primaryDark p-2 flex mx-4 px-3">
                            Add New Blog
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 font ml-1">
                                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table id="blog-table" className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-200 rounded-lg">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">ID</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">TITLE</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-start">
                                {blogs.map((blog) => (
                                    <tr key={blog._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{`...${blog._id.substring(blog._id.length - 3)}`}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{blog.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <Link to={`/admin/edit-blog/${blog._id}`}>
                                                <button type="button" className="inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white bg-dark p-1 px-2 disabled:opacity-50 disabled:pointer-events-none mr-4">Edit</button>
                                            </Link>
                                            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-red-500 p-1 px-2 text-red-500 hover:text-white hover:bg-red-600" onClick={() => handleDelete(blog._id)}>Delete</button>
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

export default BlogManage;
