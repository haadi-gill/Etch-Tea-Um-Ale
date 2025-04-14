import React from 'react';
import { useEffect, useState } from 'react';
import { fetchListing, fetchUserByEmail, fetchUserListings } from '../../bridge';
import './MyListings.css';
import { useMyListings } from '../../context/MyListingsContext';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { useAuth } from '../../context/AuthContext';


const MyListings = () => {
  const { myListings, removeFromListings } = useMyListings();
  const {user} = useAuth();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    loadListing();
  }, [user.email]);
  
  const loadListing = async () => {
    const myListings = await fetchUserListings(user.email);
    const seller = user;
    if (product != null && seller != null) {
      setProduct(product[0]);
      setSeller(seller);
    }
  };


  
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
                image={product.image}
                title={product.label}
                price={product.price}
                description={product.description}
                ratings={user.rating}
                category={product.category}
                onWishlist={false}
                sold={product.sold}
                onRemove={removeFromListings}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default MyListings;
