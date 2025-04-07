import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h2 className="logo">CollegeScavs</h2>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/sell" className="nav-link">Sell</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
