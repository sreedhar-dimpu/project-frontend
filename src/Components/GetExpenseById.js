import React, { useEffect, useState } from 'react';
import ExpenseService from '../Services/ExpenseService';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Alert,
} from '@mui/material';
import '../styles.css';

const GetExpenseById = () => {
    const [expenseId, setExpenseId] = useState('');
    const [expense, setExpense] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setExpenseId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ExpenseService.getExpenseById(expenseId)
            .then((response) => {
                setExpense(response.data);
                setError('');
            })
            .catch((error) => {
                setError('There was an error fetching the expense: ' + error.message);
                setExpense(null);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Get Expense By ID
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ marginBottom: 2 }}>
                <TextField
                    label="Expense ID"
                    name="expenseId"
                    value={expenseId}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Get Expense
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Alert>
            )}

            {expense && (
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Expense Details
                    </Typography>
                    <Typography>ID: {expense.id}</Typography>
                    <Typography>Transaction ID: {expense.transactionId}</Typography>
                    <Typography>Source: {expense.source}</Typography>
                    <Typography>Amount: {expense.amount}</Typography>
                    <Typography>
                        Spent Date: {new Date(expense.spentDate).toLocaleDateString()}
                    </Typography>
                    <Typography>
                        Created At: {new Date(expense.createdAt).toLocaleString()}
                    </Typography>
                </Paper>
            )}
        </Box>
    );
    // return (
    //     <>
    //         <h2>Get Expense By ID</h2>
    //         <form className="form-container" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label>Expense ID:</label>
    //                 <input
    //                     type="text"
    //                     name="expenseId"
    //                     value={expenseId}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Get Expense</button>
    //         </form>

    //         {error && <p className="error">{error}</p>}
    //         {expense && (
    //             <div className="expense-details">
    //                 <h3>Expense Details</h3>
    //                 <p>ID: {expense.id}</p>
    //                 <p>Transaction ID: {expense.transactionId}</p>
    //                 <p>Source: {expense.source}</p>
    //                 <p>Amount: {expense.amount}</p>
    //                 <p>Spent Date: {new Date(expense.spentDate).toLocaleDateString()}</p>
    //                 <p>Created At: {new Date(expense.createdAt).toLocaleString()}</p>
    //             </div>
    //         )}
    //     </>
    // );
};

export default GetExpenseById;
