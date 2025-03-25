import React, { useState } from 'react';
import StockService from '../Services/StockService';
import { Box, Button, TextField, Typography, FormControl } from '@mui/material';
import { useUser } from '../Context/UserContext'; // Import the UserContext to get user details

const AddStock = () => {
  const { user } = useUser(); // Access the logged-in user's details
  const [stock, setStock] = useState({
    userId: user?.id || '', // Set default userId from context
    productName: '',
    category: '',
    quantity: '',
    unitPrice: '',
  });
  const [errors, setErrors] = useState({});

  // Handle field changes and validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'productName':
        if (!value.trim()) errorMsg = 'Product Name is required.';
        break;
      case 'category':
        if (!value.trim()) errorMsg = 'Category is required.';
        break;
      case 'quantity':
        if (!value || isNaN(value) || Number(value) <= 0)
          errorMsg = 'Quantity must be a positive number.';
        break;
      case 'unitPrice':
        if (!value || isNaN(value) || Number(value) <= 0)
          errorMsg = 'Unit Price must be a positive number.';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const validateForm = () => {
    const validationErrors = {};

    validateField('productName', stock.productName);
    validateField('category', stock.category);
    validateField('quantity', stock.quantity);
    validateField('unitPrice', stock.unitPrice);

    return !Object.values(validationErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Include userId when submitting the stock
      const stockWithUserId = { ...stock, userId: user?.id };

      StockService.addStock(stockWithUserId)
        .then(() => {
          alert('Stock added successfully!');
          setStock({
            userId: user?.id || '', // Reset userId to the logged-in user
            productName: '',
            category: '',
            quantity: '',
            unitPrice: '',
          });
          setErrors({});
        })
        .catch((error) => {
          console.error('Error adding stock:', error);
          if (error.response) {
            alert(`Error: ${error.response.data.message || 'Unknown error'}`);
          } else {
            alert('Failed to connect to the server.');
          }
        });
    } else {
      alert('Please correct the errors in the form.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Stock
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth margin="normal">
          <TextField
            label="User ID"
            name="userId"
            value={stock.userId}
            disabled // Make the field read-only as it is set automatically
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Product Name"
            name="productName"
            value={stock.productName}
            onChange={handleChange}
            error={!!errors.productName}
            helperText={errors.productName}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Category"
            name="category"
            value={stock.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Quantity"
            type="number"
            name="quantity"
            value={stock.quantity}
            onChange={handleChange}
            error={!!errors.quantity}
            helperText={errors.quantity}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Unit Price"
            type="number"
            name="unitPrice"
            value={stock.unitPrice}
            onChange={handleChange}
            error={!!errors.unitPrice}
            helperText={errors.unitPrice}
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Add Stock
        </Button>
      </Box>
    </Box>
  );
};

export default AddStock;