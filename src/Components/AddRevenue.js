import React, { useEffect, useState } from 'react';
import RevenueService from '../Services/RevenueService';
import StockService from '../Services/StockService';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';
import '../styles.css';

const AddRevenue = () => {
  const [revenue, setRevenue] = useState({
    transactionId: '',
    source: '',
    amount: '',
    receivedDate: '',
    unitsSold: '', // New field
  });

  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({}); // State for validation errors

  useEffect(() => {
    StockService.getAllStocks().then((res) => {
      setProducts(res.data.map((product) => product.productName));
    });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setRevenue((prev) => ({ ...prev, source: products[0] }));
    }
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRevenue({ ...revenue, [name]: value });
    validateField(name, value); // Validate field on change
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'transactionId':
        if (!value) errorMsg = 'Transaction ID is required.';
        break;
      case 'amount':
        if (!value || isNaN(value) || Number(value) <= 0)
          errorMsg = 'Amount must be a positive number.';
        break;
      case 'receivedDate':
        if (!value) errorMsg = 'Received date is required.';
        break;
      case 'unitsSold':
        if (!value || isNaN(value) || Number(value) <= 0)
          errorMsg = 'Units sold must be a positive number.';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const validateForm = () => {
    const validationErrors = {};

    validateField('transactionId', revenue.transactionId);
    validateField('amount', revenue.amount);
    validateField('receivedDate', revenue.receivedDate);
    validateField('unitsSold', revenue.unitsSold);

    setErrors(validationErrors);
    return !Object.values(validationErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      RevenueService.addRevenue(revenue)
        .then(() => {
          alert('Revenue added successfully');
          setRevenue({
            transactionId: '',
            source: products[0] || '',
            amount: '',
            receivedDate: '',
            unitsSold: '', // Reset new field
          });
          setErrors({}); // Clear errors
        })
        .catch((error) => {
          alert('There was an error adding the revenue! ' + error);
        });
    } else {
      alert('Please fix the errors in the form before submitting.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Sale
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Transaction ID"
            name="transactionId"
            value={revenue.transactionId}
            onChange={handleChange}
            error={!!errors.transactionId}
            helperText={errors.transactionId}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Product Name</InputLabel>
          <Select
            name="source"
            value={revenue.source}
            onChange={handleChange}
            required
          >
            {products.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Amount"
            type="number"
            name="amount"
            value={revenue.amount}
            onChange={handleChange}
            error={!!errors.amount}
            helperText={errors.amount}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Received Date"
            type="date"
            name="receivedDate"
            value={revenue.receivedDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.receivedDate}
            helperText={errors.receivedDate}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Units Sold"
            type="number"
            name="unitsSold"
            value={revenue.unitsSold}
            onChange={handleChange}
            error={!!errors.unitsSold}
            helperText={errors.unitsSold}
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
          Add Revenue
        </Button>
      </Box>
    </Box>
  );
};

export default AddRevenue;