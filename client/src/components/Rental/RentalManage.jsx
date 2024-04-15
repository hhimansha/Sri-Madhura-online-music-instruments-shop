import React, { useState, useEffect } from "react";

const RentalManage = () => {
  const [rentalItems, setRentalItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentalItems = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/rentals/');
        if (!response.ok) {
          throw new Error('Failed to fetch rental items');
        }
        const data = await response.json();
        setRentalItems(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRentalItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col max-w-full mx-auto my-10 ml-80">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">IMAGE</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">TITLE</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">STOCK COUNT</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">RENTAL PRICE</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">AVAILABILITY</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-start">
                {rentalItems.map((rentalItem) => (
                  <tr key={rentalItem._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{rentalItem._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><img src={`http://localhost:5050/uploads/${rentalItem.image}`} alt={rentalItem.title} className="w-12 h-12 object-cover" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{rentalItem.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{rentalItem.stockCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${rentalItem.rentalPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{rentalItem.stockCount > 0 ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-800  disabled:opacity-50 disabled:pointer-events-none mr-4">Update</button>
                      <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:text-red-700  disabled:opacity-50 disabled:pointer-events-none">Delete</button>
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

export default RentalManage;
