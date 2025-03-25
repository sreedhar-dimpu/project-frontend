import React, { useEffect, useState } from 'react';
import TransactionService from '../Services/TransactionService';
import StockService from '../Services/StockService';
import { useUser } from '../Context/UserContext'; // Import the UserContext to get user details
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

const UpdateTransaction = () => {
    const { user } = useUser(); // Access the logged-in user's details
    const [transaction, setTransaction] = useState({
        id: '',
        userId: user?.id || '', // Automatically pass userId
        type: '',
        paymentType: '',
        amount: '',
        transactionDate: '',
        source: '',
        expenseType: '',
        quantity: '',
    });

    const [errors, setErrors] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch all available products (stocks)
        StockService.getAllStocks(user?.id).then((res) => {
            setProducts(res.data.map((product) => product.productName));
        });
    }, [user?.id]);

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
        validateField(e.target.name, e.target.value);
    };

    const validateField = (name, value) => {
        let errorMsg = '';

        switch (name) {
            case 'type':
                if (!value) errorMsg = 'Type is required.';
                break;
            case 'paymentType':
                if (!value) errorMsg = 'Payment Type is required.';
                break;
            case 'amount':
                if (!value || isNaN(value) || Number(value) <= 0)
                    errorMsg = 'Amount must be a positive number.';
                break;
            case 'transactionDate':
                if (!value) errorMsg = 'Transaction Date is required.';
                break;
            case 'quantity':
                if (
                    (transaction.type === 'Revenue' || transaction.expenseType === 'Stock Purchase') &&
                    (!value || isNaN(value) || Number(value) <= 0)
                ) {
                    errorMsg = 'Quantity must be a positive number.';
                }
                break;
            case 'source':
                if (
                    (transaction.type === 'Revenue' || transaction.expenseType === 'Stock Purchase') &&
                    !value
                ) {
                    errorMsg = 'Product Name is required.';
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };

    const validateForm = () => {
        const validationErrors = {};
        validateField('type', transaction.type);
        validateField('paymentType', transaction.paymentType);
        validateField('amount', transaction.amount);
        validateField('transactionDate', transaction.transactionDate);
        validateField('source', transaction.source);
        validateField('quantity', transaction.quantity);

        return !Object.values(validationErrors).some((error) => error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            TransactionService.updateTransaction(transaction)
                .then(() => {
                    alert('Transaction updated successfully');
                    setTransaction({
                        id: '',
                        userId: user?.id || '', // Reset userId to the logged-in user
                        type: '',
                        paymentType: '',
                        amount: '',
                        transactionDate: '',
                        source: '',
                        expenseType: '',
                        quantity: '',
                    });
                    setErrors({});
                })
                .catch((error) => {
                    alert('There was an error updating the transaction! ' + error);
                });
        } else {
            alert('Please correct the errors in the form.');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Update Transaction
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Transaction ID"
                        name="id"
                        value={transaction.id}
                        onChange={handleChange}
                        error={!!errors.id}
                        helperText={errors.id}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="User ID"
                        name="userId"
                        value={transaction.userId}
                        disabled // Make the field read-only as it is set automatically
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
                {(transaction.type === 'Revenue' || transaction.expenseType === 'Stock Purchase') && (
                    <>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Product Name</InputLabel>
                            <Select
                                name="source"
                                value={transaction.source}
                                onChange={handleChange}
                                error={!!errors.source}
                                required
                            >
                                {products.map((p) => (
                                    <MenuItem key={p} value={p}>
                                        {p}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.source && (
                                <Typography color="error" variant="body2">
                                    {errors.source}
                                </Typography>
                            )}
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
                    </>
                )}
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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Update Transaction
                </Button>
            </Box>
        </Box>
    );
};

export default UpdateTransaction;