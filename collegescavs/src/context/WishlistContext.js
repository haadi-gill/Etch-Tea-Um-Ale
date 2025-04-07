import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook for easy access
export const useWishlist = () => useContext(WishlistContext);
