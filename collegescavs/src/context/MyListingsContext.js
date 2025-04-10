import React, { createContext, useState, useContext } from 'react';

const MyListingsContext = createContext();

export const useMyListings = () => {
  return useContext(MyListingsContext);
};

export const MyListingsProvider = ({ children }) => {
  const [myListings, setMyListings] = useState([
    { 
      id: 1, 
      title: 'Laptop', 
      price: 999, 
      description: 'A powerful laptop for gaming and work', 
      condition: 'new', 
      image: '../assets/laptop.jpg', 
      ratings: 2.5, 
      category: 'Electronics', 
      sold: false 
    },
    { 
      id: 2, 
      title: 'Smartphone', 
      price: 499, 
      description: 'A sleek and modern smartphone', 
      condition: 'new', 
      image: '../assets/phone.png', 
      ratings: 1, 
      category: 'Electronics', 
      sold: true 
    },
  ]);

  const removeFromListings = (id) => {
    setMyListings((prev) => prev.filter((product) => product.id !== id));
  };

  const markAsSold = (id) => {
    setMyListings((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, sold: true } : product
      )
    );
  };

  const relistProduct = (id) => {
    setMyListings((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, sold: false } : product
      )
    );
  };

  return (
    <MyListingsContext.Provider value={{ myListings, removeFromListings, markAsSold, relistProduct }}>
      {children}
    </MyListingsContext.Provider>
  );
};
