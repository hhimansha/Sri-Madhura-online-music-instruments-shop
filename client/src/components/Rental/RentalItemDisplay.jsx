import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FilterBar from './FilterBar';
import { Link } from 'react-router-dom';

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
        setFilteredItems(data); // Initialize filteredItems with all rental items
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
      <div className="flex flex-wrap justify-center lg:mx-10 xl:mx-40">
  {searchQuery.trim() === '' ? (
    filteredItems.map((rentalItem) => (
      <motion.div
        key={rentalItem._id}
        className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8 flex justify-center"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full">
          <Link to={`/rentals/${rentalItem._id}`} className="block w-full h-full">
            <img
              src={`http://localhost:5050/uploads/${rentalItem.image}`}
              alt={rentalItem.title}
              className="w-full h-64 object-cover aspect-w-1 aspect-h-1"
            />
            <div className="p-4">
              <h2 className="text-md font-semibold text-left">{rentalItem.title}</h2>
              <p className="mt-2 text-left font-semibold text-primary text-xl border-t-2">${rentalItem.rentalPrice} per day</p>
            </div>
          </Link>
        </div>
      </motion.div>
    ))
  ) : (
    filteredItems.map((rentalItem) => (
      rentalItem.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
        <motion.div
          key={rentalItem._id}
          className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8 flex justify-center"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full">
            <Link to={`/rentals/${rentalItem._id}`} className="block w-full h-full">
              <img
                src={`http://localhost:5050/uploads/${rentalItem.image}`}
                alt={rentalItem.title}
                className="w-full h-64 object-cover aspect-w-1 aspect-h-1"
              />
              <div className="p-4">
                <h2 className="text-md font-semibold text-left">{rentalItem.title}</h2>
                <p className="mt-2 text-left font-semibold text-primary text-xl border-t-2">${rentalItem.rentalPrice} per day</p>
              </div>
            </Link>
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
