import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext'; 
import { fetchListing } from '../bridge';
const WishlistContext = createContext();



export const WishlistProvider = ({ children }) => {
  const { user, logout } = useAuth(); 
  const [wishlist, setWishlist] = useState([]);

  
  useEffect(() => {
    if (user) {
      const userWishlistKey = `wishlist_${user.email}`; 
      const storedWishlist = localStorage.getItem(userWishlistKey);

      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));  
      }
    }
  }, [user]); 


  const saveWishlistToLocalStorage = (updatedWishlist) => {
    if (user) {
      const userWishlistKey = `wishlist_${user.email}`;  

      localStorage.setItem(userWishlistKey, JSON.stringify(updatedWishlist));  
    }
  };

  
  const clearWishlist = () => {
    if (user) {
      const userWishlistKey = `wishlist_${user.email}`;  
      localStorage.removeItem(userWishlistKey);  
    }

    setWishlist([]);  
  };

  
  const addToWishlist = async (product) => {
    const listing = await fetchListing(product.id);
    if (user.email === listing[0].user_email) {
      alert('Cannot add your own listing to your wishlist');
      return;
    }
    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist, product];
      saveWishlistToLocalStorage(updatedWishlist);  
      return updatedWishlist;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter(item => item.id !== id);
      saveWishlistToLocalStorage(updatedWishlist);  
      return updatedWishlist;
    });
  };

  useEffect(() => {
    if (!user) {
      clearWishlist();  
    }
  }, [user]);  


  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};


