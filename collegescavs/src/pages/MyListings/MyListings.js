import React, { useEffect, useState } from 'react';
import { fetchUserListings } from '../../bridge';
import './MyListings.css';
import { useMyListings } from '../../context/MyListingsContext';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { useAuth } from '../../context/AuthContext';

const MyListings = () => {
  const { myListings, removeFromListings } = useMyListings();
  const { user } = useAuth();
  const [product, setProduct] = useState([]);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    loadListing();
  }, [user]);
  
  const loadListing = async () => {
    if (user?.email) {
      const myListingsData = await fetchUserListings(user.email);
      setProduct(myListingsData);
      setSeller(user);
    } else {
      setProduct([]);
      setSeller(null);
    }
  };

  const isOwnListing = user && seller && user.email === seller.email;

  return (
    <div className="my-listings">
      {myListings.length === 0 ? (
        <p>No items in your listings.</p>
      ) : (
        <div className="my-listings-grid">
          {myListings.map((product) => (
            <Link 
              to={`/product/${product.post_id}`} 
              key={product.post_id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card
                id={product.post_id}
                image={product.images}
                title={product.label}
                price={product.price}
                description={product.description}
                ratings={user.rating}
                category={product.category}
                onWishlist={false}
                active={product.active}
                onRemove={removeFromListings}
                isOwnListing={isOwnListing}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
