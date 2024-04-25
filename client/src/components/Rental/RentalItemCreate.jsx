import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useParams, useNavigate } from "react-router-dom";

import { useRentalItemContext } from '../../hooks/useRentalItemContext';

export default function RentalItemCreate() {
  const { dispatch } = useRentalItemContext();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !rentalPrice || !stockCount || !image) {
      setEmptyFields(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('rentalPrice', rentalPrice);
    formData.append('stockCount', stockCount);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5050/api/rentals/rentalcreate', {
        method: 'POST',
        body: formData
      });

      const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            } else {
                setError('');
                navigate('/admindash/rentals');
            }

      // Assuming the response is the created rental item object
      const createdRentalItem = await response.json();

      // Dispatch action to update context state with the created rental item
      dispatch({ type: 'ADD_RENTAL_ITEM', payload: createdRentalItem });

      // Clear form fields
      setTitle('');
      setDescription('');
      setCategory('');
      setRentalPrice('');
      setStockCount('');
      setImage(null);
      setImageName('');
      setEmptyFields(false);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className='max-w-[750px] mx-auto my-10' onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="">
          <h1 className="text-2xl font-semibold leading-7 text-gray-900 text-left">List Rental Item</h1>
          <p className="mt-1 text-sm leading-6 text-gray-600 text-left">
            Fill the details below to list the rental item.
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
                  className="block w-full flex-1 border-0 bg-gray-100 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md bg-gray-100 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="image" className="block text-md font-medium leading-6 text-gray-900 text-left">
                Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6  text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />

                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  {imageName && <p className="text-xs leading-5 text-gray-600">{imageName}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="sm:col-span-3">
            <label htmlFor="category" className="block text-md font-medium leading-6 text-gray-900 text-left">
              Category
            </label>
            <div className="mt-2">
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">Select category</option>
                <option value="Drums">Drums</option>
                <option value="Guitars">Guitars</option>
                
              </select>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="rentalPrice" className="block text-md font-medium leading-6 text-gray-900 text-left">
                Rental price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="rentalPrice"
                  id="rentalPrice"
                  value={rentalPrice}
                  onChange={(e) => setRentalPrice(e.target.value)}
                  className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter rental price"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="stockCount" className="block text-md font-medium leading-6 text-gray-900 text-left">
                Stock count
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="stockCount"
                  id="stockCount"
                  value={stockCount}
                  onChange={(e) => setStockCount(e.target.value)}
                  className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          List Item
        </button>
      </div>
    </form>
  );
}