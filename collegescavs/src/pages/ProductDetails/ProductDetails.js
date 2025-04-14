import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAllListings, fetchListing, fetchUserByEmail } from '../../bridge';
import './ProductDetails.css';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWishlist } from '../../context/WishlistContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMyListings } from '../../context/MyListingsContext';
import { useAuth } from '../../context/AuthContext';

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

  if (!product) return <div className="loading">Loading...</div>;

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
  const isOwnListing = user && seller && user.email === seller.email;

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.post_id);
    } else {
      addToWishlist(product);
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

  const handleRemoveListing = () => {
    const confirmed = window.confirm('Are you sure you want to remove this listing?');
    if (confirmed) {
      removeFromListings(product.post_id);
      navigate(-1);
    }
  };

  const handleMarkAsSold = () => {
    markAsSold(product.post_id);
    setProduct((prevProduct) => ({ ...prevProduct, sold: true }));
  };

  const handleRelistProduct = () => {
    relistProduct(product.post_id);
    setProduct((prevProduct) => ({ ...prevProduct, sold: false }));
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
              <div className="heart-icon" onClick={toggleWishlist}>
                {isWishlisted ? (
                  <FavoriteIcon style={{ color: '#ff6b81' }} />
                ) : (
                  <FavoriteBorderIcon style={{ color: '#ff6b81' }} />
                )}
              </div>
              <div className="price-tag">${product.price}</div>
            </div>
          </div>

          <div className="stars-row">
            {renderStars(seller)}
            <span className="numeric-rating">{Number(seller.rating).toFixed(1)}</span>
          </div>

          <div className="condition-category">
            <p className='cond'><strong>Condition:</strong> {product.condition}</p>
            <p className='cat'><strong>Category:</strong> {product.category}</p>
          </div>

          {product.sold && <div className="sold-tag">SOLD</div>}

          {!isOwnListing && !product.sold && (
            <button 
              className={`contact-btn ${product.sold ? 'disabled' : ''}`}
              onClick={handleContactSeller}
              disabled={product.sold}
            >
              Contact Seller
            </button>
          )}

          {isOwnListing && !product.sold && (
            <button 
              className="contact-btn" 
              onClick={handleMarkAsSold}
            >
              Mark as Sold
            </button>
          )}

          {isOwnListing && product.sold && (
            <button 
              className="contact-btn" 
              onClick={handleRelistProduct}
            >
              Relist Product
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
              <p><strong>Phone:</strong> {seller.phone}</p>
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
