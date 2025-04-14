import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import './Profile.css';
import LoginOverlay from '../../components/LoginOverlay/LoginOverlay';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchUserListings } from '../../bridge';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginOverlay />;
  }

  const handleSignoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <main className="profile-main">
        <h1>Your CollegeScavs Profile</h1>
        <h2>{user.name}</h2>
        <h6 className="email-text">{user.email}</h6>
        <p>Rating: {user.rating}⭐</p>
 
        <div className="spacer" />
        <button className="signout-button" onClick={handleSignoutClick}>Sign Out</button>
      </main>
    </div>
  );
};

export default Profile;
