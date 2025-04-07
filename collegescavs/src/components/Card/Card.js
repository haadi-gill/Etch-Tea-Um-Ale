import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { useWishlist } from '../../context/WishlistContext'; 

const Card = ({ id, image, title, price }) => {
  const { addToWishlist } = useWishlist();

  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist({ id, image, title, price });
   
  };

  return (
    <div className="card">
      <Link to={`/product/${id}`} className="card-link">
        <img src={image} alt={title} className="card-image" />
      </Link>
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">${price}</p>
        <button className="btn" onClick={handleWishlist}>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Card;
