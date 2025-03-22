import React, { useEffect, useState } from 'react';
import ExpenseService from '../Services/ExpenseService';
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
import StockService from '../Services/StockService';

const UpdateExpense = () => {
    const [expense, setExpense] = useState({
        id: '',
        transactionId: '',
        expenseType: '',
        amount: '',
        paidDate: '',
        source: ''
    });
    
    const [products, setProducts] = useState([])

    useEffect(() => {
        StockService.getAllStocks().then(res => {
            setProducts(res.data.map(product => product.productName))
        })
    },[])

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ExpenseService.updateExpense(expense)
            .then((response) => {
                alert('Expense updated successfully');
                setExpense({
                    id: '',
                    transactionId: '',
                    expenseType: '',
                    amount: '',
                    paidDate: ''
                });
            })
            .catch((error) => {
                alert('There was an error updating the expense! ' + error);
            });
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
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Transaction ID"
                        name="transactionId"
                        value={expense.transactionId}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Expense Type</InputLabel>
                    <Select
                        name="expenseType"
                        value={expense.expenseType}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="">Select Type</MenuItem>
                        <MenuItem value="Rent">Rent</MenuItem>
                        <MenuItem value="Utilities">Utilities</MenuItem>
                        <MenuItem value="Salary">Salary</MenuItem>
                        <MenuItem value="Supplies">Supplies</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Amount"
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                    />
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
                        label="Spent Date"
                        type="date"
                        name="paidDate"
                        value={expense.paidDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
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
