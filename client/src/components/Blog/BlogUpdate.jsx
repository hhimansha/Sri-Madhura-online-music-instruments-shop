import React, { useState, useEffect } from "react";

function BlogUpdate({ match }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:5050/blog/${match.params.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch blog");
                }
                const data = await response.json();
                setFormData({
                    title: data.title,
                    description: data.description,
                    image: data.image
                });
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBlog();
    }, [match.params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5050/blog/${match.params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to update blog");
            }
            console.log("Blog updated successfully");
        } catch (error) {
            console.error("Error updating blog:", error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
            <div className="bg-primary px-10 py-10 text-center text-white">
                <p className="text-2xl font-semibold">Update Blog</p>
                <p className="text-center text-blue-100">Modify blog details below</p>
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
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BlogUpdate;
