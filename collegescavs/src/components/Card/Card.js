import React from 'react';
import './Card.css';

const Card = ({ image, title, price, onClick }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-info">
        <h3>{title}</h3>
        <p>${price}</p>
        <button className="btn" onClick={onClick}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
