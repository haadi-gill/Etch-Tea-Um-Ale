import React from 'react';
import './Wishlist.css';
import { useWishlist } from '../../context/WishlistContext';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(({ id, image, title, price }) => (
            <div key={id} className="wishlist-card">
              <img src={image} alt={title} className="wishlist-image" />
              <h3>{title}</h3>
              <p>${price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
