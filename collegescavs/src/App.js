import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Wishlist from './pages/WishList/Wishlist';
import Sell from './pages/Sell/Sell';
import Profile from './pages/Profile/Profile';
import { WishlistProvider } from './context/WishlistContext';
import MyListings from './pages/MyListings/MyListings';
import { MyListingsProvider } from './context/MyListingsContext';

const App = () => {
  return (
    <WishlistProvider>
      <MyListingsProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<div>Profile Page</div>} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/mylistings" element={<MyListings />} />
            </Routes>
          </div>
        </Router>
      </MyListingsProvider>
    </WishlistProvider>
  );
};

export default App;
