import React, { useEffect, useState } from 'react';
import ExpenseService from '../Services/ExpenseService';
import { Box, Button, MenuItem, Select, TextField, Typography, FormControl, InputLabel } from '@mui/material';
import '../styles.css';
import StockService from '../Services/StockService';

const AddExpense = () => {
    const [expense, setExpense] = useState({
        transactionId: '',
        expenseType: '',
        amount: '',
        paidDate: '',
        unitsPurchased: 0,
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
        ExpenseService.addExpense(expense)
            .then((response) => {
                alert('Expense added successfully');
                setExpense({
                    transactionId: '',
                    expenseType: '',
                    amount: '',
                    paidDate: ''
                });
            })
            .catch((error) => {
                alert('There was an error adding the expense! ' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Add Expense
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
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
                        InputProps={{inputProps:{
                            min: 0,
                        }}}
                        value={expense.amount}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Units Purchased"
                        type="number"
                        name="unitsPurchased"
                        InputProps={{inputProps:{
                            min: 0,
                        }}}
                        value={expense.unitsPurchased}
                        onChange={handleChange}
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
    )
    // return (
    //     <>
    //         <h2>Add Expense</h2>
    //         <form className="form-container" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label>Transaction ID:</label>
    //                 <input
    //                     type="text"
    //                     name="transactionId"
    //                     value={expense.transactionId}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Expense Type:</label>
    //                 <select
    //                     name="expenseType"
    //                     value={expense.expenseType}
    //                     onChange={handleChange}
    //                     required
    //                 >
    //                     <option value="">Select Type</option>
    //                     <option value="Rent">Rent</option>
    //                     <option value="Utilities">Utilities</option>
    //                     <option value="Salary">Salary</option>
    //                     <option value="Supplies">Supplies</option>
    //                     <option value="Other">Other</option>
    //                 </select>
    //             </div>
    //             <div className="form-group">
    //                 <label>Amount:</label>
    //                 <input
    //                     type="number"
    //                     name="amount"
    //                     value={expense.amount}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Spent Date:</label>
    //                 <input
    //                     type="date"
    //                     name="paidDate"
    //                     value={expense.paidDate}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Add Expense</button>
    //         </form>
    //     </>
    // );
};

export default AddExpense;
