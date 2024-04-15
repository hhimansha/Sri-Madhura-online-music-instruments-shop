import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRental = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [rentalPrice, setRentalPrice] = useState('');
    const [stockCount, setStockCount] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState(false);

    useEffect(() => {
        const fetchRentalItem = async () => {
            try {
                const response = await fetch(`http://localhost:5050/api/rentals/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch rental item');
                }
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
                setCategory(data.category);
                setRentalPrice(data.rentalPrice);
                setStockCount(data.stockCount);
                setImageName(data.image);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchRentalItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedRentItem = {
            title,
            description,
            category,
            rentalPrice,
            stockCount,
        };
    
        const formData = new FormData();
        formData.append('image', image);
    
        // Append JSON data
        for (const key in updatedRentItem) {
            formData.append(key, updatedRentItem[key]);
        }
    
        try {
            const response = await fetch(`http://localhost:5050/api/rentals/update/${id}`, {
                method: 'PUT',
                body: formData,
            });
    
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            } else {
                setError('');
                navigate('/admindash/rentals');
            }
        } catch (error) {
            console.error('Error updating rental item:', error.message);
            setError(error.message);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
    };


    return (
        <form className='max-w-[750px] mx-auto my-10' onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="">
                    <h1 className="text-2xl font-semibold leading-7 text-gray-900 text-left">Update Rental Item</h1>
                    <p className="mt-1 text-sm leading-6 text-gray-600 text-left">
                        Update the details below for the rental item.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-md font-medium leading-6 text-gray-900 text-left">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Enter title"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-md font-medium leading-6 text-gray-900 text-left">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Enter description"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="category" className="block text-md font-medium leading-6 text-gray-900 text-left">
                                Category
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Enter category"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="image" className="block text-md font-medium leading-6 text-gray-900 text-left">
                                Image
                            </label>
                            <div className="mt-2 flex items-center gap-x-2">
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block border-gray-300 rounded-md  focus:ring-primary focus:border-primary sm:text-sm"
                                />
                                <span className="text-sm text-gray-600">{imageName}</span>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="rentalPrice" className="block text-md font-medium leading-6 text-gray-900 text-left">
                                Rental Price
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="rentalPrice"
                                    id="rentalPrice"
                                    value={rentalPrice}
                                    onChange={(e) => setRentalPrice(e.target.value)}
                                    className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Enter rental price"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="stockCount" className="block text-md font-medium leading-6 text-gray-900 text-left">
                                Stock Count
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="stockCount"
                                    id="stockCount"
                                    value={stockCount}
                                    onChange={(e) => setStockCount(e.target.value)}
                                    className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Enter stock count"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {emptyFields && <p className="text-red-500">All fields are required</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-md font-semibold leading-6 text-gray-900">
                    Clear
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-primary px-3 py-2 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Update Item
                </button>
            </div>
        </form>
    );
};

export default UpdateRental;
