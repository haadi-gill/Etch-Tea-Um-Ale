import React, { useState } from 'react';
import './Sell.css';

const Sell = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    ratings: '',
    category: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.title || formData.title.length > 50) {
      newErrors.title = 'Title is required and must be less than 50 characters';
    }

    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price is required and must be a positive number';
    }

    if (!formData.description || formData.description.length > 200) {
      newErrors.description = 'Description is required and must be less than 200 characters';
    }

    if (!formData.image) {
      newErrors.image = 'Image URL is required';
    }

    if (!formData.ratings || isNaN(formData.ratings) || formData.ratings < 0 || formData.ratings > 5) {
      newErrors.ratings = 'Ratings must be between 0 and 5';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data ready for backend:', formData);
      alert('Item listed successfully! (Backend integration pending)');
    }
  };

  return (
    <div className="sell-page">
      <h1>List an Item for Sale</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength="50"
            required
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="1"
            required
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="200"
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Sell;
