import React, { useState, useEffect } from 'react';

function BlogHome() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch stored blogs from your backend or wherever they are stored
        const fetchBlogs = async () => {
            try {
                // Make a request to fetch blogs
                const response = await fetch('http://localhost:5050/blog/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                console.log('Fetched blogs:', data); // Log the fetched data
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            }
        };
    
        fetchBlogs();
    }, []);
    

    return (
        <section>
            {/* Container */}
            <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
                {/* Component */}
                <div className="flex flex-col items-center">
                    {/* Heading Div */}
                    <div className="mb-8 max-w-[800px] text-center md:mb-12 lg:mb-16">
                        <h2 className="mb-4 mt-6 text-3xl font-extrabold md:text-5xl">The latest and greatest news</h2>
                        <p className="mx-auto mt-4 max-w-[528px] text-[#636262]">Lorem ipsum dolor sit amet elit ut aliquam</p>
                    </div>
                    {/* Blog Content */}
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/* Dynamic rendering of blog posts */}
                        {blogs.map((blog) => (
                            <a key={blog._id} href={`/blog/${blog._id}`} className="flex max-w-full flex-col gap-4 rounded-md px-4 md:px-2">
                                <img alt={blog.title} src={blog.image} className="inline-block h-60 w-full rounded-2xl object-cover" />
                                <div className="flex h-full w-full flex-col items-start justify-around px-0 py-4">
                                    <div className="mb-4 flex flex-col items-start gap-4">
                                        <div className="rounded-md bg-[#f6ad1b] px-2 py-1.5">
                                            <p>{blog.category}</p>
                                        </div>
                                        <p className="text-xl font-bold md:text-2xl">{blog.title}</p>
                                    </div>
                                    {/* Author */}
                                    <div className="flex flex-col items-start md:flex-row lg:items-center">
                                        <p className="text-sm text-[#636262]">{blog.author}</p>
                                        <p className="ml-2 mr-2 hidden text-sm text-[#636262] md:block">-</p>
                                        <p className="text-sm text-[#636262]">{blog.readTime} mins</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogHome;
