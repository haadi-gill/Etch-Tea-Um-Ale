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
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </div>
        </Router>
      </WishlistProvider>
    </AuthProvider>
  );
};

export default App;
