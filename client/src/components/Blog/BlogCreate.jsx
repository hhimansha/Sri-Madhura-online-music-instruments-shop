import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function BlogCreate() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
    });

    // Get the navigate function
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5050/blog/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Failed to create blog");
            }
            // Optionally, handle success response here
            console.log("Blog created successfully");
            // Navigate to the "/admindash/blogs" page
            navigate("/admindash/blogs");
            // Reset form fields
            setFormData({
                title: "",
                description: "",
                image: "",
            });
        } catch (error) {
            console.error("Error creating blog:", error.message);
            // Optionally, handle error here
        }
    };

    return (
        <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
            <div className="bg-primary px-10 py-10 text-center text-white">
                <p className="text-2xl font-semibold">Submit your request</p>
                <p className="text-center text-blue-100">Please keep it short and succinct</p>
            </div>
            <div className="space-y-4 px-8 py-10">
                <form onSubmit={handleSubmit}>
                    <label className="block" htmlFor="title">
                        <p className="text-gray-600">Title</p>
                        <input
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                        />
                    </label>
                    <label className="block" htmlFor="description">
                        <p className="text-gray-600">Description</p>
                        <textarea
                            className="h-32 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                        ></textarea>
                    </label>
                    <label className="block" htmlFor="image">
                        <p className="text-gray-600">Image URL</p>
                        <input
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />
                    </label>
                    <button className="mt-4 rounded-full bg-black px-10 py-2 font-semibold text-white" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BlogCreate;
