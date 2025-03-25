import React, { useEffect, useState } from 'react';
import ExpenseService from '../Services/ExpenseService';
import StockService from '../Services/StockService';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import '../styles.css';

const UpdateExpense = () => {
    const [expense, setExpense] = useState({
        id: '',
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
        // Fetch available product names
        StockService.getAllStocks().then((res) => {
            setProducts(res.data.map((product) => product.productName));
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
        validateField(name, value); // Validate field on change
    };

    const validateField = (name, value) => {
        let errorMsg = '';

        switch (name) {
            case 'id':
                if (!value) errorMsg = 'Expense ID is required.';
                break;
            case 'transactionId':
                if (!value) errorMsg = 'Transaction ID is required.';
                break;
            case 'expenseType':
                if (!value) errorMsg = 'Expense type is required.';
                break;
            case 'amount':
                if (!value || isNaN(value) || Number(value) <= 0)
                    errorMsg = 'Amount must be a positive number.';
                break;
            case 'paidDate':
                if (!value) errorMsg = 'Paid date is required.';
                break;
            case 'unitsPurchased':
                if (expense.expenseType === 'Stock Purchase' && (!value || isNaN(value) || Number(value) <= 0)) {
                    errorMsg = 'Units purchased must be a positive number.';
                }
                break;
            case 'source':
                if (expense.expenseType === 'Stock Purchase' && !value) {
                    errorMsg = 'Product Name is required for Stock Purchase.';
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };

    const validateForm = () => {
        const validationErrors = {};
        validateField('id', expense.id);
        validateField('transactionId', expense.transactionId);
        validateField('expenseType', expense.expenseType);
        validateField('amount', expense.amount);
        validateField('paidDate', expense.paidDate);
        validateField('unitsPurchased', expense.unitsPurchased);
        validateField('source', expense.source);

        return !Object.values(validationErrors).some((error) => error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            ExpenseService.updateExpense(expense)
                .then(() => {
                    alert('Expense updated successfully');
                    setExpense({
                        id: '',
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
                    alert('There was an error updating the expense! ' + error);
                });
        } else {
            alert('Please correct the errors in the form.');
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Update Expense
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Expense ID"
                        name="id"
                        value={expense.id}
                        onChange={handleChange}
                        error={!!errors.id}
                        helperText={errors.id}
                        required
                    />
                </FormControl>
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
                        <MenuItem value="Stock Purchase">Stock Purchase</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {errors.expenseType && (
                        <Typography color="error" variant="body2">
                            {errors.expenseType}
                        </Typography>
                    )}
                </FormControl>
                {expense.expenseType === 'Stock Purchase' && (
                    <>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Product Name</InputLabel>
                            <Select
                                name="source"
                                value={expense.source}
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
                                label="Units Purchased"
                                type="number"
                                name="unitsPurchased"
                                value={expense.unitsPurchased}
                                onChange={handleChange}
                                error={!!errors.unitsPurchased}
                                helperText={errors.unitsPurchased}
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
                        value={expense.amount}
                        onChange={handleChange}
                        error={!!errors.amount}
                        helperText={errors.amount}
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
                    Update Expense
                </Button>
            </Box>
        </Box>
    );
};

export default UpdateExpense;