import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import FilterBar from '../../components/FilterBar/FilterBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchAllListings } from '../../bridge';
import { Link } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Tooltip } from '@mui/material';
import './Home.css';
import { useWishlist } from '../../context/WishlistContext';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filters, setFilters] = useState({ price: '', rating: '', category: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const { wishlist, removeFromWishlist } = useWishlist();

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

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  return (
    <div className="home">
      <SearchBar
        onSearch={(query) => setSearchQuery(query)}
        suggestions={allProducts.map(p => p.title)}
      />

      <Tooltip title="Filter">
        <button 
          className={`filter-button ${isFilterVisible ? 'shifted' : ''}`} 
          onClick={toggleFilterBar}>
            <FilterListIcon />
        </button>
      </Tooltip>

      <FilterBar 
        isVisible={isFilterVisible} 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onClose={toggleFilterBar} 
      />

      <div className={`content ${isFilterVisible ? 'shifted' : ''}`}>
        <div className="products">
          {displayedProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
                ratings={product.ratings}
                category={product.category}
                onClick={() => handleAddToCart(product)}
                onWishlist={wishlist.some(item => item.id === product.id)}
                onRemove={handleRemoveFromWishlist}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
