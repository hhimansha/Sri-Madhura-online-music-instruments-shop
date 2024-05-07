import React from 'react';

function filterbar({ categories, onFilterChange, onSortChange, onSearch }) {
  return (
    <div className="flex justify-center items-center mb-4">
      <div>
        <select className="p-2 border rounded-md mr-4" onChange={(e) => onFilterChange(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select className="p-2 border rounded-md" onChange={(e) => onSortChange(e.target.value)}>
          <option value="">Sort By</option>
          <option value="titleAsc">Title A-Z</option>
          <option value="titleDesc">Title Z-A</option>
          <option value="priceAsc">Price Low to High</option>
          <option value="priceDesc">Price High to Low</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          className="p-2 border rounded-md ml-4"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default filterbar;
