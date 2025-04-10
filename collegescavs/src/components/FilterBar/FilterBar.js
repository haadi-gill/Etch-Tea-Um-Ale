import React, { useState } from 'react';
import { categories } from '../../bridge';
import './FilterBar.css';

const FilterBar = ({ isVisible, filters, onFilterChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const resetFilters = () => {
    setLocalFilters({ price: '', rating: '', category: '', condition: '' });
  }

  return (
    <div className={`filter-bar ${isVisible ? 'show' : ''}`}>
      <h2>Filter Products</h2>

      <label>Max Price ($):</label>
      <input 
        type="number" 
        name="price" 
        value={localFilters.price} 
        onChange={handleInputChange} 
      />

      <label>Min Rating:</label>
      <select name="rating" value={localFilters.rating} onChange={handleInputChange}>
        <option value="">Any</option>
        <option value="5.0">5.0</option>
        <option value="4.5">4.5+</option>
        <option value="4">4.0+</option>
        <option value="3.5">3.5+</option>
        <option value="3.5">3.0+</option>
        <option value="3.5">2.5+</option>
        <option value="3.5">2.0+</option>
        <option value="3.5">1.5+</option>
        <option value="3.5">1.0+</option>
        <option value="3.5">0.5+</option>
      </select>

      <label>Category:</label>
      <select name="category" value={localFilters.category} onChange={handleInputChange}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label>Condition:</label>
      <select name="condition" value={localFilters.condition} onChange={handleInputChange}>
        <option value="">Any</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>

      <button onClick={applyFilters}>Apply Filters</button>
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
  );
};

export default FilterBar;
