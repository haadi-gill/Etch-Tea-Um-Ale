import React from 'react';
import './Wishlist.css';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist">
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <Link 
              to={`/product/${product.post_id}`} 
              key={product.post_id}
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
                onWishlist={true}
                onRemove={removeFromWishlist}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
