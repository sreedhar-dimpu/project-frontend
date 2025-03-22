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
            })
            .catch((error) => {
                alert('There was an error adding the transaction! ' + error);
            });
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
                    <InputLabel>Expense Type</InputLabel>
                    <Select
                        name="expenseType"
                        value={transaction.expenseType}
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
                        value={transaction.amount}
                        onChange={handleChange}
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
                        required
                    />
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
    )

    // return (
    //     <>
    //         <h2>Add Transaction</h2>
    //         <form className="form-container" onSubmit={handleSubmit}>
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
    //                 <select
    //                     name="type"
    //                     value={transaction.type}
    //                     onChange={handleChange}
    //                     required
    //                 >
    //                     <option value="">Select</option>
    //                     <option value="Sale">Sale</option>
    //                     <option value="Expense">Expense</option>
    //                 </select>
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
    //                 <label>Quantity:</label> {/* New input field */}
    //                 <input
    //                     type="number"
    //                     name="quantity"
    //                     value={transaction.quantity}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Payment Type:</label>
    //                 <select
    //                     name="paymentType"
    //                     value={transaction.paymentType}
    //                     onChange={handleChange}
    //                     required
    //                 >
    //                     <option value="">Select</option>
    //                     <option value="Cash">Cash</option>
    //                     <option value="UPI">UPI</option>
    //                     <option value="Credit Card">Credit Card</option>
    //                     <option value="Debit Card">Debit Card</option>
    //                     <option value="Other">Other</option>
    //                 </select>
    //             </div>
                
    //                 <div className="form-group">
    //                     <label>Product Name:</label>
    //                     <input
    //                         type="text"
    //                         name="source"
    //                         value={transaction.source}
    //                         onChange={handleChange}
    //                     />
    //                 </div>
                
    //             {transaction.type === 'Expense' && (
    //                 <div className="form-group">
    //                     <label>Expense Type:</label>
    //                     <select
    //                         name="expenseType"
    //                         value={transaction.expenseType}
    //                         onChange={handleChange}
    //                     >
    //                         <option value="">Select</option>
    //                         <option value="Rent">Rent</option>
    //                         <option value="Utilities">Utilities</option>
    //                         <option value="Salary">Salary</option>
    //                         <option value="Stock Purchase">Stock Purchase</option>
    //                         <option value="Other">Other</option>
    //                     </select>
    //                 </div>
    //             )}
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
    //             <button type="submit">Add Transaction</button>
    //         </form>
    //     </>
    // );
};

export default AddTransaction;
