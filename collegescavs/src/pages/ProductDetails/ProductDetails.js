import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchListing, fetchUserByEmail, removeListing, updateListing } from '../../bridge';
import './ProductDetails.css';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWishlist } from '../../context/WishlistContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMyListings } from '../../context/MyListingsContext';
import { useAuth } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';

const ProductDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [showSellerInfo, setShowSellerInfo] = useState(false);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { myListings, markAsSold, relistProduct, removeFromListings } = useMyListings();
  const navigate = useNavigate();

  useEffect(() => {
    loadListing();
  }, [id]);

  const loadListing = async () => {
    const product = await fetchListing(id);
    const seller = await fetchUserByEmail(product[0].user_email);
    if (product != null && seller != null) {
      setProduct(product[0]);
      setSeller(seller);
    }
  };

  if (!product) return <div className="loading"><CircularProgress color='aqua' /></div>;

  const renderStars = (seller) => {
    const fullStars = Math.floor(seller.rating);
    const totalStars = 5;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={i} className="star filled" />
        ))}
        {[...Array(totalStars - fullStars)].map((_, i) => (
          <StarBorderIcon key={i} className="star" />
        ))}
      </>
    );
  };

  const isWishlisted = wishlist.some(item => item.id === product.post_id);
  console.log('isWishlisted:', isWishlisted);
  const isOwnListing = user && seller && user.email === seller.email;

  const toggleWishlist = () => {
    const wishlistItem = {
      id: product.product_id,
      image: product.images,
      title: product.label,
      price: product.price,
      ratings: seller.rating,
    };
  
    if (isWishlisted) {
      removeFromWishlist(product.post_id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handleContactSeller = () => {
    const confirmed = window.confirm('Do you promise not to share seller info?');
    if (confirmed) {
      setShowSellerInfo(true);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRemoveListing = async () => {
    const confirmed = window.confirm('Are you sure you want to remove this listing?');
    if (confirmed) {
      removeFromListings(product.post_id);
      await removeListing(product.post_id);
      const success = await updateListing(product.post_id);
      navigate(-1);
    }
  };

  const handleToggleListingStatus = async () => {
    const newStatus = await updateListing(product.post_id, product.active);
    if (newStatus !== null) {
      setProduct(prev => ({ ...prev, active: newStatus }));
    } else {
      console.error('Failed to update listing status');
    }
  };

  return (
    <div className="product-details-page">
      <button className="back-btn" onClick={handleBackClick}>
        <ArrowBackIcon />
      </button>
      <div className="product-box">
        <div className="image-section">
          <img src={product.image} alt={product.label} />
        </div>

        <div className="info-section">
          <div className="header-row">
            <h2>{product.label}</h2>
            <div className="price-and-like">
              {/* Wishlist toggle is commented out, you can enable this if needed */}
              {/* <div className="heart-icon" onClick={toggleWishlist}>
                {isWishlisted ? (
                  <FavoriteIcon style={{ color: '#ff6b81' }} />
                ) : (
                  <FavoriteBorderIcon style={{ color: '#ff6b81' }} />
                )}
              </div> */}
              <div className="price-tag">${product.price}</div>
            </div>
          </div>

          <div className="stars-row">
            {renderStars(seller)}
            <span className="numeric-rating">{Number(seller.rating).toFixed(1)}</span>
          </div>

          <div className="condition-category">
            <p className='cond'><strong>Condition:</strong> {product.cond}</p>
            <p className='cat'><strong>Category:</strong> {product.category}</p>
          </div>

          {product.active === 'N' && <div className="sold-tag">SOLD</div>}

          {!isOwnListing && product.active === 'Y' && (
            <button 
              className="contact-btn"
              onClick={handleContactSeller}
            >
              Contact Seller
            </button>
          )}

          {isOwnListing && (
            <button 
              className="contact-btn" 
              onClick={handleToggleListingStatus}
            >
              {product.active === 'N' ? 'Relist Product' : 'Mark as Sold'}
            </button>
          )}

          {isOwnListing && (
            <button 
              className="contact-btn" 
              onClick={handleRemoveListing}
              style={{ backgroundColor: '#ff6b81' }}
            >
              Remove Listing
            </button>
          )}

          {showSellerInfo && (
            <div className="seller-info">
              <p><strong>Email:</strong> {seller.email}</p>
            </div>
          )}
        </div>
      </div>

      <div className="description-section">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
