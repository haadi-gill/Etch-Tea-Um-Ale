import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Replace this with actual dynamic data fetching when backend implemented
    const products = [
      { id: 1, title: 'Laptop', price: 999, description: 'A powerful laptop for gaming and work', image: '../assets/laptop.jpg', ratings: 4.5, category: 'Electronics' },
      { id: 2, title: 'Smartphone', price: 499, description: 'A sleek and modern smartphone', image: '../assets/phone.png', ratings: 4, category: 'Electronics' },
      { id: 3, title: 'Headphones', price: 199, description: 'Noise-cancelling over-ear headphones', image: '../assets/headphones.jpg', ratings: 4.2, category: 'Accessories' },
      { id: 4, title: 'Camera', price: 799, description: 'Good aklj skdfaj kj ksjf klajdfkljaslkdjfk jksjfkajdkf  kasjfksj  lkjf klasjdfl  lkadsjf sdkfj lajdf aksdjf asjdflkja ljsdkl asjfkljsd ksaljf lkasjdf dsjf askf sdj f', image:  '../assets/camera.jpg', ratings: 4.7, category: 'Electronics' },
      { id: 5, title: 'Gaming Console', price: 399, description: 'A next-gen console with amazing graphics and performance', image: '../assets/phone.png', ratings: 4.8, category: 'Electronics' },
      { id: 6, title: 'Smartwatch', price: 150, description: 'Track your fitness with this sleek smartwatch', image: '../assets/phone.png', ratings: 4.3, category: 'Accessories' },
      { id: 7, title: 'Bluetooth Speaker', price: 89, description: 'Portable speaker with great sound quality', image: '../assets/phone.png', ratings: 4.6, category: 'Electronics' },
      { id: 8, title: 'Laptop Sleeve', price: 25, description: 'Protect your laptop with this stylish sleeve', image: '../assets/phone.png', ratings: 4.1, category: 'Accessories' },
      { id: 9, title: 'Portable Charger', price: 35, description: 'Keep your devices charged on the go', image: '../assets/phone.png', ratings: 4.4, category: 'Accessories' },
      { id: 10, title: 'Wireless Mouse', price: 45, description: 'Ergonomic wireless mouse for smooth navigation', image: '../assets/phone.png', ratings: 4.2, category: 'Accessories' },
      { id: 11, title: 'Electric Scooter', price: 499, description: 'Ride in style with this electric scooter', image: '../assets/phone.png', ratings: 4.7, category: 'Electronics' },
      { id: 12, title: 'Bluetooth Earbuds', price: 120, description: 'High-quality sound in a compact design', image: '../assets/phone.png', ratings: 4.3, category: 'Accessories' },
      { id: 13, title: 'E-Reader', price: 129, description: 'Carry thousands of books in a compact device', image: '../assets/phone.png', ratings: 4.5, category: 'Electronics' },
      { id: 14, title: 'Drone', price: 799, description: 'Capture stunning aerial shots with this drone', image: '../assets/phone.png', ratings: 4.9, category: 'Electronics' },
      { id: 15, title: 'Projector', price: 350, description: 'Project your media onto any surface for a cinematic experience', image: '../assets/phone.png', ratings: 4.6, category: 'Electronics' }
    ];

    const selectedProduct = products.find((product) => product.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} />
      </div>
      <h1>{product.title}</h1>
      <p className="price">Price: ${product.price}</p>
      <p className="category">Category: {product.category}</p>
      <p className="ratings">Ratings: {product.ratings}</p>

      <div className="description">
        <p>{product.description}</p>
      </div>

      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default ProductDetails;