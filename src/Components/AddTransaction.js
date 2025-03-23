import React, { useState } from 'react';
import TransactionService from '../Services/TransactionService';
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

const AddTransaction = () => {
    const [transaction, setTransaction] = useState({
        userId: '',
        type: '',
        paymentType: '',
        amount: '',
        transactionDate: '',
        source: '',
        expenseType: '',
        quantity: '' // New field
    });

    const [errors, setErrors] = useState({}); // Validation errors

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
        validateField(e.target.name, e.target.value); // Validate field on change
    };

    const validateField = (name, value) => {
        let errorMsg = '';

        switch (name) {
            case 'userId':
                if (!value) errorMsg = 'User ID is required.';
                break;
            case 'type':
                if (!value) errorMsg = 'Type is required.';
                break;
            case 'paymentType':
                if (!value) errorMsg = 'Payment Type is required.';
                break;
            case 'amount':
                if (!value || isNaN(value) || Number(value) <= 0) errorMsg = 'Amount must be a positive number.';
                break;
            case 'transactionDate':
                if (!value) errorMsg = 'Transaction Date is required.';
                break;
            case 'quantity':
                if (!value || isNaN(value) || Number(value) <= 0) errorMsg = 'Quantity must be a positive number.';
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };

    const validateForm = () => {
        const validationErrors = {};

        validateField('userId', transaction.userId);
        validateField('type', transaction.type);
        validateField('paymentType', transaction.paymentType);
        validateField('amount', transaction.amount);
        validateField('transactionDate', transaction.transactionDate);
        validateField('quantity', transaction.quantity);

        return !Object.values(validationErrors).some((error) => error); // If no errors exist
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            TransactionService.addTransaction(transaction)
                .then((response) => {
                    alert('Transaction added successfully');
                    setTransaction({
                        userId: '',
                        type: '',
                        paymentType: '',
                        amount: '',
                        transactionDate: '',
                        source: '',
                        expenseType: '',
                        quantity: '' // Reset new field
                    });
                    setErrors({}); // Clear errors
                })
                .catch((error) => {
                    alert('There was an error adding the transaction! ' + error);
                });
        } else {
            alert('Please correct the errors in the form.');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Add Transaction
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="User ID"
                        name="userId"
                        value={transaction.userId}
                        onChange={handleChange}
                        error={!!errors.userId}
                        helperText={errors.userId}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Type</InputLabel>
                    <Select
                        name="type"
                        value={transaction.type}
                        onChange={handleChange}
                        error={!!errors.type}
                        required
                    >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Revenue">Sale</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                    {errors.type && (
                        <Typography color="error" variant="body2">
                            {errors.type}
                        </Typography>
                    )}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Amount"
                        type="number"
                        name="amount"
                        value={transaction.amount}
                        onChange={handleChange}
                        error={!!errors.amount}
                        helperText={errors.amount}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Quantity"
                        type="number"
                        name="quantity"
                        value={transaction.quantity}
                        onChange={handleChange}
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Payment Type</InputLabel>
                    <Select
                        name="paymentType"
                        value={transaction.paymentType}
                        onChange={handleChange}
                        error={!!errors.paymentType}
                        required
                    >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="UPI">UPI</MenuItem>
                        <MenuItem value="Credit Card">Credit Card</MenuItem>
                        <MenuItem value="Debit Card">Debit Card</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {errors.paymentType && (
                        <Typography color="error" variant="body2">
                            {errors.paymentType}
                        </Typography>
                    )}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Product Name"
                        name="source"
                        value={transaction.source}
                        onChange={handleChange}
                    />
                </FormControl>
                {transaction.type === 'Expense' && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Expense Type</InputLabel>
                        <Select
                            name="expenseType"
                            value={transaction.expenseType}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Rent">Rent</MenuItem>
                            <MenuItem value="Utilities">Utilities</MenuItem>
                            <MenuItem value="Salary">Salary</MenuItem>
                            <MenuItem value="Stock Purchase">Stock Purchase</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                )}
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Transaction Date"
                        type="date"
                        name="transactionDate"
                        value={transaction.transactionDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.transactionDate}
                        helperText={errors.transactionDate}
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
                    Add Transaction
                </Button>
            </Box>
        </Box>
    );
};

export default AddTransaction;