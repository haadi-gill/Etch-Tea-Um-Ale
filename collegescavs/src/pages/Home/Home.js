import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import FilterBar from '../../components/FilterBar/FilterBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchAllListings } from '../../bridge';
import './Home.css';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]); // Full list
  const [displayedProducts, setDisplayedProducts] = useState([]); // Filtered + searched
  const [filters, setFilters] = useState({ price: '', rating: '', category: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const listings = await fetchAllListings();
        setAllProducts(listings);
        setDisplayedProducts(listings);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    loadProducts();
  }, []);

  const toggleFilterBar = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFiltersAndSearch = (products, filters, query) => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(query.toLowerCase());
      const matchesFilters =
        (filters.price === '' || product.price <= parseInt(filters.price)) &&
        (filters.rating === '' || product.ratings >= parseFloat(filters.rating)) &&
        (filters.category === '' || product.category === filters.category);

      return matchesSearch && matchesFilters;
    });
  };

  useEffect(() => {
    const filtered = applyFiltersAndSearch(allProducts, filters, searchQuery);
    setDisplayedProducts(filtered);
  }, [filters, searchQuery, allProducts]);

  const handleAddToCart = (product) => {
    alert(`Added ${product.title} to cart`);
  };

  return (
    <div className="home">
      <SearchBar
        onSearch={(query) => setSearchQuery(query)}
        suggestions={allProducts.map(p => p.title)}
      />

      <button 
        className={`filter-button ${isFilterVisible ? 'shifted' : ''}`} 
        onClick={toggleFilterBar}>
        Filter
      </button>

      <FilterBar 
        isVisible={isFilterVisible} 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onClose={toggleFilterBar} 
      />

      <div className={`content ${isFilterVisible ? 'shifted' : ''}`}>
        <div className="products">
          {displayedProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
              ratings={product.ratings}
              category={product.category}
              onClick={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </div>

      <Button text="View Cart" onClick={() => alert('Viewing Cart')} />
    </div>
  );
};

export default Home;
