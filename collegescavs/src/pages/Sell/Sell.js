import React, { useState } from 'react';
import './Sell.css';
import { Autocomplete, TextField, Input, ImageList } from '@mui/material';
import { categories, uploadListing } from '../../bridge';
import { useAuth } from '../../context/AuthContext';
import { Tooltip } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Sell = () => {
  const {user} = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    ratings: '',
    category: '',
    condition: '',
    user_email: ''
  });
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);


  const validate = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length > 50) {
      newErrors.title = 'Title is required and must be less than 50 characters';
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price is required and must be a positive number';
    }
    if (!formData.description || formData.description.length > 50000) {
      newErrors.description = 'Description is required and must be less than 500 characters';
    }
    if (!formData.image) {
      newErrors.image = 'Image is required';
    }
    /*
    if (!formData.ratings || isNaN(formData.ratings) || formData.ratings < 0 || formData.ratings > 5) {
      newErrors.ratings = 'Ratings must be between 0 and 5';
    }
    */
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }
    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setErrors(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      formData.user_email = user.email;
    } else {
      alert('Please sign in to post a new listing!');
      return;
    }
    if (validate()) {

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('file', imageFile);
        uploadData.append('upload_preset', 'react_unsigned_upload');
  
        const res = await fetch(`https://api.cloudinary.com/v1_1/dwslsphgi/image/upload`, {
          method: 'POST',
          body: uploadData,
        });
  
        const data = await res.json();
  
        if (!data.secure_url) {
          throw new Error('Image upload failed');
        }
        
        var imageUrl = data.secure_url;
        setFormData(prev => ({ ...prev, image: imageUrl }));
      }
      else{
        console.log("Failed to upload image");
        return;
      }

      console.log('Form data ready for backend:', formData);
      const success = await uploadListing(formData.user_email.toString(), formData.title.toString(), formData.description.toString(), formData.price.toString(), imageUrl, formData.condition.toString(),  formData.category.toString(),);
      if (success) {
        alert('Item listed successfully!');
      } else {
        alert('Error uploading listing');
      }
    }
  };

  return (
    <div className="sell-page">
      <h1>List an Item for Sale</h1>
      <form onSubmit={handleSubmit} className="sell-form">
        <div className="form-top">
          <div className="form-left">
            {formData.image ? (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" className="image-preview-img" />
                <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
                  Remove Picture
                </button>
              </div>
            ) : (
              <Tooltip title="Upload Image">
                <label htmlFor="image-upload" className="image-upload-label">
                  <PhotoCameraIcon sx={{ fontSize: 70, color: 'white' }} />
                </label>
            </Tooltip>
            )}
            <Input
              id="image-upload"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              sx={{ display: 'none' }}
            />
            {errors.image && <p className="error-text">{errors.image}</p>}
          </div>
          <div className="form-right">
            <div className="form-group">
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.title)}
                helperText={errors.title}
                InputLabelProps={{ shrink: formData.title.length > 0 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#09BC8A',
                      borderWidth: 2,
                    },
                    '&:hover fieldset': { borderColor: '#09BC8A' },
                    '&.Mui-focused fieldset': {
                      borderColor: '#09BC8A',
                      boxShadow: '0 0 8px rgba(9,188,138,0.5)',
                    },
                  },
                  '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#09BC8A' } },
                  '& .MuiInputBase-input': { color: '#D3D3D3' },
                }}
              />
            </div>

            <div className="form-group">
              <TextField
                id="price"
                label="Price ($)"
                variant="outlined"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                fullWidth
                error={Boolean(errors.price)}
                helperText={errors.price}
                InputLabelProps={{ shrink: formData.price.toString().length > 0 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#09BC8A',
                      borderWidth: 2,
                    },
                    '&:hover fieldset': { borderColor: '#09BC8A' },
                    '&.Mui-focused fieldset': {
                      borderColor: '#09BC8A',
                      boxShadow: '0 0 8px rgba(9,188,138,0.5)',
                    },
                  },
                  '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#09BC8A' } },
                  '& .MuiInputBase-input': { color: '#D3D3D3' },
                  '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                  '& input[type="number"]': {
                    '-moz-appearance': 'textfield',
                  },
                }}
              />
            </div>

            <div className="form-group">
              <Autocomplete
                id="category"
                name="category"
                value={formData.category}
                onChange={(e, value) => setFormData(prev => ({ ...prev, category: value }))}
                options={categories}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select category"
                    variant="outlined"
                    error={Boolean(errors.category)}
                    helperText={errors.category}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: errors.category ? '#f44336' : '#09BC8A',
                          borderWidth: 2,
                        },
                        '&:hover fieldset': { borderColor: '#09BC8A' },
                        '&.Mui-focused fieldset': {
                          borderColor: '#09BC8A',
                          boxShadow: '0 0 8px rgba(9,188,138,0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#09BC8A' } },
                      '& .MuiInputBase-input': { color: '#D3D3D3' },
                      '& .MuiAutocomplete-popupIndicator': { color: '#ffffff' },
                      '& .MuiAutocomplete-popover': { backgroundColor: '#333333', top: '100%' },
                      '& .MuiAutocomplete-clearIndicator': { color: '#ffffff' },
                    }}
                  />
                )}
                isOptionEqualToValue={(option, value) => option === value}
              />
            </div>
            <div className="form-group">
              <Autocomplete
                id="comdition"
                name="condition"
                value={formData.condition}
                onChange={(e, value) => setFormData(prev => ({ ...prev, condition: value }))}
                options={['New', 'Used']}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select condition"
                    variant="outlined"
                    error={Boolean(errors.condition)}
                    helperText={errors.condition}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: errors.condition ? '#f44336' : '#09BC8A',
                          borderWidth: 2,
                        },
                        '&:hover fieldset': { borderColor: '#09BC8A' },
                        '&.Mui-focused fieldset': {
                          borderColor: '#09BC8A',
                          boxShadow: '0 0 8px rgba(9,188,138,0.5)',
                        },
                      },
                      '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#09BC8A' } },
                      '& .MuiInputBase-input': { color: '#D3D3D3' },
                      '& .MuiAutocomplete-popupIndicator': { color: '#ffffff' },
                      '& .MuiAutocomplete-popover': { backgroundColor: '#333333', top: '100%' },
                      '& .MuiAutocomplete-clearIndicator': { color: '#ffffff' },
                    }}
                  />
                )}
                isOptionEqualToValue={(option, value) => option === value}
              />
            </div>
          </div>
        </div>
        <div className="form-group full-width">
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            maxLength="500"
            fullWidth
            error={Boolean(errors.description)}
            helperText={errors.description}
            InputLabelProps={{ shrink: formData.description.length > 0 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#09BC8A', borderWidth: 2 },
                '&:hover fieldset': { borderColor: '#09BC8A' },
                '&.Mui-focused fieldset': {
                  borderColor: '#09BC8A',
                  boxShadow: '0 0 8px rgba(9,188,138,0.5)',
                },
              },
              '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#09BC8A' } },
              '& .MuiInputBase-input': { color: '#D3D3D3' },
            }}
          />
        </div>
        <button type="submit" className="submit-btn">List Item</button>
      </form>
    </div>
  );
};

export default Sell;
