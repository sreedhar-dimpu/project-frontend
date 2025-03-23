import React, { useState } from 'react';
import StockService from '../Services/StockService';
import { Box, Button, TextField, Typography, FormControl } from '@mui/material';
import '../styles.css';

const AddStock = () => {
  const [stock, setStock] = useState({
    productName: '',
    category: '',
    quantity: '',
    unitPrice: '',
  });

  const [errors, setErrors] = useState({}); // State for validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
    validateField(name, value); // Validate each field on change
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'productName':
        if (!value) errorMsg = 'Product Name is required.';
        break;
      case 'category':
        if (!value) errorMsg = 'Category is required.';
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

    setErrors(validationErrors);
    return !Object.values(validationErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      StockService.addStock(stock)
        .then(() => {
          alert('Stock added successfully');
          setStock({
            productName: '',
            category: '',
            quantity: '',
            unitPrice: '',
          });
          setErrors({}); // Clear errors
        })
        .catch((error) => {
          alert('There was an error adding the stock! ' + error);
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