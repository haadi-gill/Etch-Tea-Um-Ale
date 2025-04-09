import React, { useState, useEffect, useRef } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltip } from '@mui/material';
import './SearchBar.css';

const SearchBar = ({ onSearch, suggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searched, setSearched] = useState(false);
  
  const justClickedRef = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searched) {
      setShowSuggestions(false);
      return;
    }
    
    if (justClickedRef.current) {
      justClickedRef.current = false;
      setShowSuggestions(false);
      return;
    }

    if (inputValue.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const matches = suggestions.filter(item =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    }
  }, [inputValue, suggestions, searched]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (searched) setSearched(false);
  };

  const handleSuggestionClick = (value) => {
    setInputValue(value);
    setShowSuggestions(false);
    justClickedRef.current = true;
    setSearched(true);
    if (onSearch) onSearch(value);
    inputRef.current.blur();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(inputValue);
    setShowSuggestions(false);
    setSearched(true);
    inputRef.current.blur();
  };

  const handleReset = () => {
    setInputValue('');
    if (onSearch) onSearch('');
    setShowSuggestions(false);
    setSearched(false);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
          className="search-input"
          onFocus={() => {
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
        <Tooltip title="Reset">
          <button type="button" className="search-button reset" onClick={handleReset}>
            <RestartAltIcon />
          </button>
        </Tooltip>
        <Tooltip title="Search">
          <button type="submit" className="search-button">
            <SearchIcon />
          </button>
        </Tooltip>
    </form>
  );
};

export default SearchBar;
