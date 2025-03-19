import React, { useState } from 'react';
import ExpenseService from '../Services/ExpenseService';
import { Box, Button, TextField, Typography } from '@mui/material';
import '../styles.css';

const DeleteExpense = () => {
    const [expenseId, setExpenseId] = useState('');

    const handleChange = (e) => {
        setExpenseId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ExpenseService.deleteExpense(expenseId)
            .then((response) => {
                alert('Expense deleted successfully');
                setExpenseId('');
            })
            .catch((error) => {
                alert('There was an error deleting the expense! ' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Delete Expense
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
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
                    color="error"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Delete Expense
                </Button>
            </Box>
        </Box>
    );
    // return (
    //     <>
    //         <h2>Delete Expense</h2>
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
    //             <button type="submit">Delete Expense</button>
    //         </form>
    //     </>
    // );
};

export default DeleteExpense;
