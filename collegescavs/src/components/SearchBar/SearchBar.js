import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, suggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // Flag to indicate a search has been executed
  const [searched, setSearched] = useState(false);
  
  const justClickedRef = useRef(false); // To track if suggestion was clicked
  const inputRef = useRef(null); // Ref for the input element

  // Handle input change and filtering suggestions
  useEffect(() => {
    // If a search has been executed, do not show suggestions
    if (searched) {
      setShowSuggestions(false);
      return;
    }
    
    if (justClickedRef.current) {
      justClickedRef.current = false; // Reset after click
      setShowSuggestions(false); // Hide suggestions after a click
      return;
    }

    if (inputValue.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false); // Hide suggestions when input is cleared
    } else {
      const matches = suggestions.filter(item =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    }
  }, [inputValue, suggestions, searched]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // If the user is manually changing input, reset the searched flag
    if (searched) setSearched(false);
  };

  // Handle when a suggestion is clicked
  const handleSuggestionClick = (value) => {
    setInputValue(value);
    setShowSuggestions(false);  // Hide suggestions immediately
    justClickedRef.current = true; // Mark that a suggestion was clicked
    setSearched(true); // Mark that a search has been executed
    if (onSearch) onSearch(value);
    inputRef.current.blur(); // Remove focus from input after clicking a suggestion
  };

  // Handle form submission (search)
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(inputValue);
    setShowSuggestions(false); // Ensure suggestions are hidden after search
    setSearched(true); // Mark that a search has been executed
    inputRef.current.blur(); // Remove focus from input after submitting
  };

  // Handle reset
  const handleReset = () => {
    setInputValue('');
    if (onSearch) onSearch('');
    setShowSuggestions(false); // Explicitly hide suggestions after reset
    setSearched(false); // Reset search flag so suggestions can appear again
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-wrapper">
        <input
          ref={inputRef} // Attach ref to the input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
          className="search-input"
          onFocus={() => {
            // Only show suggestions if there is input and no search has been executed
            if (inputValue.trim() && !searched) {
              setShowSuggestions(true);
            }
          }}
        />
        {showSuggestions && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((item, index) => (
              <li key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="reset" className="search-button" onClick={handleReset}>
        Reset
      </button>
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
