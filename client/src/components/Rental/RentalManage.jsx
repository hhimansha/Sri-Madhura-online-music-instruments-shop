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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

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
            <table className="min-w-fit divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">ID</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">IMAGE</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">TITLE</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">STOCK COUNT</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">RENTAL PRICE</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">AVAILABILITY</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-bold text-dark uppercase">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-start">
                {rentalItems.map((rentalItem) => (
                  <tr key={rentalItem._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{`...${rentalItem._id.substring(rentalItem._id.length - 3)}`}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1  cursor-pointer" onClick={() => copyToClipboard(rentalItem._id)}>
                      <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                        <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />                      </svg>


                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><img src={`http://localhost:5050/uploads/${rentalItem.image}`} alt={rentalItem.title} className="w-12 h-12 object-cover" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{rentalItem.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{rentalItem.stockCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${rentalItem.rentalPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{rentalItem.stockCount > 0 ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button type="button" className="inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white bg-dark p-1  disabled:opacity-50 disabled:pointer-events-none mr-4">Update</button>
                      <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-red-500 p-1 text-red-500 hover:text-white hover:bg-red-600  disabled:opacity-50 disabled:pointer-events-none">Delete</button>
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
