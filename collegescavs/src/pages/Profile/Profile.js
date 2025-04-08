import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import './Profile.css';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useParams, Link, useNavigate } from 'react-router-dom';
import { fetchUserListings, fetchUserInfo } from '../../bridge';

/*
Profile page that contains information pertaining to the logged in user.
Shows name (email), rating, and listings
Items can be removed or added depending on what is stored in the database.
Currently links to mock information in bridge.js
*/

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ price: '', rating: '', category: '' });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    if (user) {
      const userListings = fetchUserListings(user.email);
      setListings(userListings);
    }
  }, [user]);

  if (!user) return <Navigate to="/" />;

  const handleDelete = (id) => {
    alert(`Deleted product: ${id}`);
    // temporary function. option to delete listing
  };

  const toggleFilterBar = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSignoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
        <div className="sidebar-content">
            <aside className="profile-sidebar">
                <img src={user.profilePic} alt="Profile" className="profile-picture" />
                <h6 className = "email-text">{user.email}</h6>
                <p>Rating: {user.rating}⭐</p> 
                
                <div className = "spacer" />
                <button className="signout-button" onClick={handleSignoutClick}>Sign Out</button>
            </aside>
        </div>

      <main className="profile-main">
        <div className="profile-topbar">
          <input type="text" placeholder="Filter and Search" className="profile-search" />
          <button className="profile-new-button">NEW</button>
        </div>

        <h2 className="profile-user-listings">Your Listings:</h2>
        <div className={`content ${isFilterVisible ? 'shifted' : ''}`}>
        <div className="products">
          {listings.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              description={item.description}
              ratings={item.ratings}
              category={item.category}
              from='profile'
              showWishlistButton={false}
              showDeleteButton={true}
              onDelete = {handleDelete}
              //onClick={() => handleAddToCart(product)} <= TODO: Remove Listing button
            />
          ))}
        </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
