import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import FilterBar from '../../components/FilterBar/FilterBar';
import { fetchAllListings } from '../../bridge';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ price: '', rating: '', category: '' });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const listings = await fetchAllListings();
        setProducts(listings);
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

  const filteredProducts = products.filter(product => {
    return (
      (filters.price === '' || product.price <= parseInt(filters.price)) &&
      (filters.rating === '' || product.ratings >= parseFloat(filters.rating)) &&
      (filters.category === '' || product.category === filters.category)
    );
  });

  const handleAddToCart = (product) => {
    alert(`Added ${product.title} to cart`);
  };

  return (
    <div className="home">
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
          {filteredProducts.map((product) => (
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
