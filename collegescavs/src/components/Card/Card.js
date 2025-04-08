import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { useWishlist } from '../../context/WishlistContext'; 

const Card = ({ id, image, title, price, showWishlistButton = true, showDeleteButton = false, onDelete, from='/home' }) => {
  const { addToWishlist } = useWishlist();
  
  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist({ id, image, title, price });
   
  };

  return (
    <div className="card">
      <Link to={`/product/${id}`} state={{from}} className="card-link">
        <img src={image} alt={title} className="card-image" />
      </Link>
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">${price}</p>
        {showWishlistButton && ( //handle case if card access from profile page, don't show button
          <button className="btn" onClick={handleWishlist}>
          Add to Wishlist
        </button>
        )}
        {showDeleteButton && ( /*this is unfinished/unimplemented delete functionality, if we 
        decide to add an option to delete listings. only shows if accessed from profile
        Idea is that a user can delete one of their own listings from this page*/
        <button className="btn" onClick={(e) => {
          e.stopPropagation();
          onDelete?.(id);
        }}>Remove Listing</button>
        )}
        
      </div>
    </div>
  );
};

export default Card;
