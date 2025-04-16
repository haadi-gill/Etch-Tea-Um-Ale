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
import { updateListing, removeListing } from '../../bridge';

const Card = ({
  id,
  image,
  title,
  price,
  ratings,
  active,  
  onWishlist = false,
  onRemove,
  isOwnListing
}) => {
  const { addToWishlist } = useWishlist();
  const { removeFromListings, updateListingStatus } = useMyListings();

  const handleWishlist = (e) => {
    e.preventDefault();
    if (onWishlist && onRemove) {
      onRemove(id);
    } else {
      addToWishlist({ id, image, title, price, ratings });
    }
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
      const newStatus = await updateListing(id, active);
    if (newStatus !== null) {
      console.log("Toggled status to:", newStatus);
      updateListingStatus(id, newStatus === 'Y');
    } else {
      console.log("Failed to toggle status");
    }
  };

  const handleRemoveListing = async (e) => {
    e.preventDefault();
    removeFromListings(id);
    await removeListing(id);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon
          key={`full-${i}`}
          style={{ color: '#FFD700', fontSize: '1.2rem' }}
        />
      );
    }
    if (halfStar) {
      stars.push(
        <StarHalfIcon
          key="half"
          style={{ color: '#FFD700', fontSize: '1.2rem' }}
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarOutlineIcon
          key={`empty-${i}`}
          style={{ color: '#FFD700', fontSize: '1.2rem' }}
        />
      );
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
          {/*
            Optionally, if you want to display stars based on ratings:
          */}
          {/*
          <Tooltip title={`User Rating: ${ratings} stars`}>
            <div className="card-rating">
              <PersonIcon style={{ color: '#09BC8A', fontSize: '1.2rem' }} />
              {renderStars(ratings)}
            </div>
          </Tooltip>
          */}
        </div>
        {!isOwnListing && (
          <Tooltip title={onWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}>
            <button className="wishlist-btn" onClick={handleWishlist}>
              {onWishlist ? (
                <FavoriteIcon style={{ color: '#09BC8A', fontSize: '1.8rem' }} />
              ) : (
                <FavoriteBorderIcon style={{ color: '#09BC8A', fontSize: '1.8rem' }} />
              )}
            </button>
          </Tooltip>
        )}
      </div>

      {active === "N" && <div className="sold-tag-card">SOLD</div>}

      {isOwnListing && (
        <div className="listing-buttons">
          <button className="sold-btn" onClick={handleButtonClick}>
            {active === "N" ? 'Relist' : 'Mark as Sold'}
          </button>
          <button className="remove-btn" onClick={handleRemoveListing}>
            Remove Listing
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
