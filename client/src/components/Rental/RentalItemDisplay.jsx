import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FilterBar from './FilterBar';

function RentalItemDisplay() {
  const [rentalItems, setRentalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const categories = [...new Set(rentalItems.map(item => item.category))];

  const applyFilters = () => {
    let filtered = rentalItems;

    // Apply category filter
    if (selectedCategory !== '') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Apply search query filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Apply sorting
    if (selectedSort === 'titleAsc') {
      filtered.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    } else if (selectedSort === 'titleDesc') {
      filtered.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
    } else if (selectedSort === 'priceAsc') {
      filtered.sort((a, b) => a.rentalPrice - b.rentalPrice);
    } else if (selectedSort === 'priceDesc') {
      filtered.sort((a, b) => b.rentalPrice - a.rentalPrice);
    }

    setFilteredItems([...filtered]); // Ensure state update triggers re-render
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedSort, searchQuery]); // Re-apply filters whenever sorting option or search query changes

  const handleFilterChange = (value) => {
    setSelectedCategory(value);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <FilterBar
        categories={categories}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSearch={handleSearch}
      />
      <div className="flex flex-wrap justify-center lg:mx-10 xl:mx-40 ">
        {searchQuery.trim() === '' ? (
          filteredItems.map((rentalItem) => (
            <motion.div
              key={rentalItem._id}
              className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8 "
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                <img src={`http://localhost:5050/uploads/${rentalItem.image}`} alt={rentalItem.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{rentalItem.title}</h2>
                  <p className="text-gray-800 mt-2">${rentalItem.rentalPrice} per day</p>
                  <p className="text-gray-800">Stock Count: {rentalItem.stockCount}</p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          filteredItems.map((rentalItem) => (
            rentalItem.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
              <motion.div
                key={rentalItem._id}
                className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8 "
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                  <img src={`http://localhost:5050/uploads/${rentalItem.image}`} alt={rentalItem.title} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{rentalItem.title}</h2>
                    <p className="text-gray-800 mt-2">${rentalItem.rentalPrice} per day</p>
                    <p className="text-gray-800">Stock Count: {rentalItem.stockCount}</p>
                  </div>
                </div>
              </motion.div>
            )
          ))
        )}
      </div>
    </div>
  );
}

export default RentalItemDisplay;
