import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { useWishlist } from '../../context/WishlistContext'; 
import { useMyListings } from '../../context/MyListingsContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PersonIcon from '@mui/icons-material/Person';
import { Tooltip } from '@mui/material';

const Card = ({ id, image, title, price, ratings, sold, onWishlist = false, onRemove }) => {
  const { addToWishlist } = useWishlist();
  const { myListings, removeFromListings, markAsSold, relistProduct } = useMyListings();

  const productInMyListings = myListings.find((product) => product.id === id);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (onWishlist && onRemove) {
      onRemove(id);
    } else {
      addToWishlist({ id, image, title, price, ratings });
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (sold) {
      relistProduct(id);
    } else {
      markAsSold(id);
    }
  };

  const handleRemoveListing = (e) => {
    e.preventDefault();
    removeFromListings(id);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} style={{ color: '#FFD700', fontSize: '1.2rem' }} />);
    }
    if (halfStar) {
      stars.push(<StarHalfIcon key="half" style={{ color: '#FFD700', fontSize: '1.2rem' }} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOutlineIcon key={`empty-${i}`} style={{ color: '#FFD700', fontSize: '1.2rem' }} />);
    }

    return stars;
  };

  return (
    <div className="card">
      <Link to={`/product/${id}`} className="card-link">
        <img src={image} alt={title} className="card-image" />
      </Link>
      <div className="card-info">
        <div className="card-title-price">
          <h3 className="card-title">{title}</h3>
          <p className="card-price">${price}</p>
          <Tooltip title={`User Rating: ${ratings} stars`}>
            <div className="card-rating">
              <PersonIcon style={{ color: '#09BC8A', fontSize: '1.2rem' }} />
              {renderStars(ratings)}
            </div>
          </Tooltip>
        </div>
        <Tooltip title={onWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}>
          <button className="wishlist-btn" onClick={handleWishlist}>
            {onWishlist 
              ? <FavoriteIcon style={{ color: '#09BC8A', fontSize: '1.8rem' }} />
              : <FavoriteBorderIcon style={{ color: '#09BC8A', fontSize: '1.8rem' }} />}
          </button>
        </Tooltip>
      </div>
      {sold && <div className="sold-tag-card">SOLD</div>}

      {productInMyListings && (
        <div className="listing-buttons">
          <button className="sold-btn" onClick={handleButtonClick}>
            {sold ? 'Relist' : 'Mark as Sold'}
          </button>
          <button className="remove-btn" onClick={(e) => handleRemoveListing(e)}>Remove Listing</button>
        </div>
      )}
    </div>
  );
};

export default Card;
