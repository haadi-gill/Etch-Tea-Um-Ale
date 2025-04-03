import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';
import { fetchAllListings } from '../../bridge';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = fetchAllListings();

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