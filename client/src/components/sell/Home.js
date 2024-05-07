import React, { useEffect, useState } from 'react';
import bookSet from './images/bookSet1.png';
import ProteinDetails from './ProteinDetails';
import HeaderPart from './headerPart';
import FilterBar from './filterbar';

function Home() {
  const [proteins, setProteins] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchProteins = async () => {
      try {
        const response = await fetch('http://localhost:9092/api/proteins/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setProteins(json);
        // Assuming categories are available in the JSON response
        // Extracting unique categories from the proteins data
        const uniqueCategories = [...new Set(json.map(protein => protein.category))];
        setCategories(uniqueCategories);
        setFilteredItems(json); // Initially, set filtered items to all proteins
      } catch (error) {
        console.error('Error fetching proteins:', error);
        // Handle the error appropriately
      }
    };

    fetchProteins();
  }, []);

  const handleFilterChange = (selectedCategory) => {
    // Filter by category
    const filtered = selectedCategory === 'all' ? proteins : proteins.filter(protein => protein.category === selectedCategory);
    setFilteredItems(filtered);
  };

  const handleSortChange = (selectedSort) => {
    // Sort filtered items
    const sorted = [...filteredItems];
    if (selectedSort === 'titleAsc') {
      sorted.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    } else if (selectedSort === 'titleDesc') {
      sorted.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
    } else if (selectedSort === 'priceAsc') {
      sorted.sort((a, b) => a.rentalPrice - b.rentalPrice);
    } else if (selectedSort === 'priceDesc') {
      sorted.sort((a, b) => b.rentalPrice - a.rentalPrice);
    }
    setFilteredItems(sorted);
  };

  const handleSearch = (searchQuery) => {
    // Filter by search query
    const filtered = proteins.filter(protein => protein.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredItems(filtered);
  };

  return (
    <>
      <HeaderPart />
      <section className="bg-grey-light">
        <div className="grid max-w-screen-xl mb-10 px-10 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-6">
            <h3 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-4xl text-grey">Revitalize Your Music Journey</h3>
            <h3 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-6xl xl:text-6xl text-grey">EXCLUSIVE <span className="text-primary">40% OFF</span></h3>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-500">Unlock Peak Performance with Premium Protein Powders</p>
            <a href="#" className="inline-flex items-center justify-center pr-5 py-3 mr-3 text-base font-medium text-center text-primary rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              To Get Offer
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </a>
            <a href="#" className="px-5 py-3 text-20 text-white bg-grey font-semibold rounded-lg transition duration-1000 ease-in-out hover:text-white hover:bg-grey">
              Explore Now
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-6 lg:flex">
            <img src={bookSet} alt="mockup" />
          </div>
        </div>
      </section>

      <FilterBar categories={categories} onFilterChange={handleFilterChange} onSortChange={handleSortChange} onSearch={handleSearch} />

      <div className="justify-center">
        <div className="proteins flex justify-center flex-wrap w-11/12 mx-auto">
          {filteredItems && filteredItems.map((protein, index) => (
            <ProteinDetails key={protein._id} protein={protein} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
