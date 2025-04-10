import React from 'react';
import './MyListings.css';
import { useMyListings } from '../../context/MyListingsContext';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';

const MyListings = () => {
  const { myListings, removeFromListings } = useMyListings();

  return (
    <div className="my-listings">
      {myListings.length === 0 ? (
        <p>No items in your listings.</p>
      ) : (
        <div className="my-listings-grid">
          {myListings.map((product) => (
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
                onWishlist={false}
                sold={product.sold}
                onRemove={removeFromListings}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
