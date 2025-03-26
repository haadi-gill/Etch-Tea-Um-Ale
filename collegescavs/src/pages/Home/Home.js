import React from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import './Home.css';

const Home = () => {
  const products = [
    { id: 1, title: 'Laptop', price: 999, image: '../assets/laptop.jpg' },
    { id: 2, title: 'Smartphone', price: 499, image: '../assets/phone.png' },
    { id: 3, title: 'Headphones', price: 199, image: '../assets/headphones.jpg' },
    { id: 4, title: 'Camera', price: 799, image:  '../assets/camera.jpg' },
  ];

  const handleAddToCart = (product) => {
    alert(`Added ${product.title} to cart`);
  };

  return (
    <div className="home">
      <h1>CollegeScavs</h1>
      <div className="products">
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            onClick={() => handleAddToCart(product)}
          />
        ))}
      </div>
      <Button text="View Cart" onClick={() => alert('Viewing Cart')} />
    </div>
  );
};

export default Home;
