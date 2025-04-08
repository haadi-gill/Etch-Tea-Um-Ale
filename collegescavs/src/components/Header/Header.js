import React from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import LoginOverlay from '../LoginOverlay/LoginOverlay';

const Header = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <h2 className="logo">CollegeScavs</h2>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/sell" className="nav-link">Sell</Link>
          <button className="nav-link nav-button" onClick={handleProfileClick}>Profile</button>
          {showLogin && <LoginOverlay onClose={() => setShowLogin(false)} />}
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
