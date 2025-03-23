import React, { useEffect, useState } from 'react';
import ExpenseService from '../Services/ExpenseService';
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

const AddExpense = () => {
  const [expense, setExpense] = useState({
    transactionId: '',
    expenseType: '',
    amount: '',
    paidDate: '',
    unitsPurchased: 0,
    source: '',
  });
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({}); // Validation errors

  useEffect(() => {
    StockService.getAllStocks().then((res) => {
      setProducts(res.data.map((product) => product.productName));
    });
  }, []);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value); // Validate on change
  };

  const validateField = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'transactionId':
        if (!value) errorMsg = 'Transaction ID is required.';
        break;
      case 'expenseType':
        if (!value) errorMsg = 'Expense type is required.';
        break;
      case 'amount':
        if (!value || isNaN(value) || Number(value) <= 0) errorMsg = 'Amount must be a positive number.';
        break;
      case 'paidDate':
        if (!value) errorMsg = 'Paid date is required.';
        break;
      case 'unitsPurchased':
        if (value < 0) errorMsg = 'Units purchased cannot be negative.';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const validateForm = () => {
    const validationErrors = {};
    validateField('transactionId', expense.transactionId);
    validateField('expenseType', expense.expenseType);
    validateField('amount', expense.amount);
    validateField('paidDate', expense.paidDate);
    validateField('unitsPurchased', expense.unitsPurchased);

    return !Object.values(validationErrors).some((error) => error); // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      ExpenseService.addExpense(expense)
        .then(() => {
          alert('Expense added successfully');
          setExpense({
            transactionId: '',
            expenseType: '',
            amount: '',
            paidDate: '',
            unitsPurchased: 0,
            source: '',
          });
          setErrors({}); // Clear errors
        })
        .catch((error) => {
          alert('There was an error adding the expense! ' + error);
        });
    } else {
      alert('Please correct the errors in the form.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Expense
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Transaction ID"
            name="transactionId"
            value={expense.transactionId}
            onChange={handleChange}
            error={!!errors.transactionId}
            helperText={errors.transactionId}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Expense Type</InputLabel>
          <Select
            name="expenseType"
            value={expense.expenseType}
            onChange={handleChange}
            error={!!errors.expenseType}
            required
          >
            <MenuItem value="">Select Type</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Supplies">Supplies</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          {errors.expenseType && (
            <Typography color="error" variant="body2">
              {errors.expenseType}
            </Typography>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Product Name</InputLabel>
          <Select
            name="source"
            value={expense.source}
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
            InputProps={{ inputProps: { min: 0 } }}
            value={expense.amount}
            onChange={handleChange}
            error={!!errors.amount}
            helperText={errors.amount}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Units Purchased"
            type="number"
            name="unitsPurchased"
            InputProps={{ inputProps: { min: 0 } }}
            value={expense.unitsPurchased}
            onChange={handleChange}
            error={!!errors.unitsPurchased}
            helperText={errors.unitsPurchased}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Spent Date"
            type="date"
            name="paidDate"
            value={expense.paidDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.paidDate}
            helperText={errors.paidDate}
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
          Add Expense
        </Button>
      </Box>
    </Box>
  );
};

export default AddExpense;