import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({id, image, title, price, description, onClick, ratings, category }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="card">
        <img src={image} alt={title} className="card-image" />
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <p className="card-price">${price}</p>
          <p className="card-description">{description}</p>
          {ratings && <p className="card-ratings">Seller Rating: {ratings} ⭐</p>}
          {category && <p className="card-category">Category: {category}</p>}
          <button className="btn" onClick={onClick}>Buy Now</button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
