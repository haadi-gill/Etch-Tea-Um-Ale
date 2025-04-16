import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchUserListings } from '../bridge';

const MyListingsContext = createContext();

export const useMyListings = () => {
  return useContext(MyListingsContext);
};

export const MyListingsProvider = ({ children }) => {
  const { user } = useAuth();
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    const loadListings = async () => {
      if (user && user.email) {
        const listings = await fetchUserListings(user.email);
        console.log(listings);
        setMyListings(listings);
      } else {
        setMyListings([]);
      }
    };

    loadListings();
  }, [user]);

  const removeFromListings = (id) => {
    setMyListings((prev) => prev.filter((product) => product.post_id !== id));
  };

  const markAsSold = (id) => {
    setMyListings((prev) =>
      prev.map((product) =>
        product.post_id === id ? { ...product, active: "N" } : product
      )
    );
  };

  const relistProduct = (id) => {
    setMyListings((prev) =>
      prev.map((product) =>
        product.post_id === id ? { ...product, active: "Y" } : product
      )
    );
  };

  const updateListingStatus = (id, isActive) => {
    setMyListings((prev) =>
      prev.map((product) =>
        product.post_id === id ? { ...product, active: isActive ? 'Y' : 'N' } : product
      )
    );
  };

  return (
    <MyListingsContext.Provider value={{ myListings, removeFromListings, markAsSold, relistProduct, updateListingStatus }}>
      {children}
    </MyListingsContext.Provider>
  );
};
