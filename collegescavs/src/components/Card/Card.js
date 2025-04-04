import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ id, image, title, price, onClick }) => {
  return (
    <Link to={`/product/${id}`} className="card-link">
      <div className="card">
        <img src={image} alt={title} className="card-image" />
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <p className="card-price">${price}</p>
          <button className="btn" onClick={(e) => {
            e.preventDefault();
            onClick();
          }}>
            Add to Wishlist
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
