import React, { useEffect, useState } from 'react';
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
import StockService from '../Services/StockService';

const UpdateTransaction = () => {
    const [transaction, setTransaction] = useState({
        id: '',
        userId: '',
        type: '',
        paymentType: '',
        amount: '',
        transactionDate: '',
        source: '',
        expenseType: '',
        quantity: '' // New field
    });

    const [products, setProducts] = useState([])

    useEffect(() => {
        StockService.getAllStocks().then(res => {
            setProducts(res.data.map(product => product.productName))
        })
    },[])

    const handleChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        TransactionService.updateTransaction(transaction)
            .then((response) => {
                alert('Transaction updated successfully');
                setTransaction({
                    id: '',
                    userId: '',
                    type: '',
                    paymentType: '',
                    amount: '',
                    transactionDate: '',
                    source: '',
                    expenseType: '',
                    quantity: '' // Reset new field
                });
            })
            .catch((error) => {
                alert('There was an error updating the transaction! ' + error);
            });
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
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="User ID"
                        name="userId"
                        value={transaction.userId}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Type</InputLabel>
                    <Select
                        name="type"
                        value={transaction.type}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Sale">Sale</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Payment Type</InputLabel>
                    <Select
                        name="paymentType"
                        value={transaction.paymentType}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="UPI">UPI</MenuItem>
                        <MenuItem value="Credit Card">Credit Card</MenuItem>
                        <MenuItem value="Debit Card">Debit Card</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Amount"
                        type="number"
                        name="amount"
                        value={transaction.amount}
                        onChange={handleChange}
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
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Product Name</InputLabel>
                    <Select
                        name="source"
                        value={transaction.source}
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
                        label="Expense Type"
                        name="expenseType"
                        value={transaction.expenseType}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Quantity"
                        type="number"
                        name="quantity"
                        value={transaction.quantity}
                        onChange={handleChange}
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
                    Update Transaction
                </Button>
            </Box>
        </Box>
    )
    // return (
    //     <>
    //         <h2>Update Transaction</h2>
    //         <form className="form-container" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label>Transaction ID:</label>
    //                 <input
    //                     type="text"
    //                     name="id"
    //                     value={transaction.id}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>User ID:</label>
    //                 <input
    //                     type="text"
    //                     name="userId"
    //                     value={transaction.userId}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Type:</label>
    //                 <input
    //                     type="text"
    //                     name="type"
    //                     value={transaction.type}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Payment Type:</label>
    //                 <input
    //                     type="text"
    //                     name="paymentType"
    //                     value={transaction.paymentType}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Amount:</label>
    //                 <input
    //                     type="number"
    //                     name="amount"
    //                     value={transaction.amount}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Transaction Date:</label>
    //                 <input
    //                     type="date"
    //                     name="transactionDate"
    //                     value={transaction.transactionDate}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Source:</label>
    //                 <input
    //                     type="text"
    //                     name="source"
    //                     value={transaction.source}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Expense Type:</label>
    //                 <input
    //                     type="text"
    //                     name="expenseType"
    //                     value={transaction.expenseType}
    //                     onChange={handleChange}
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Quantity:</label> {/* New input field */}
    //                 <input
    //                     type="number"
    //                     name="quantity"
    //                     value={transaction.quantity}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Update Transaction</button>
    //         </form>
    //     </>
    // );
};

export default UpdateTransaction;
