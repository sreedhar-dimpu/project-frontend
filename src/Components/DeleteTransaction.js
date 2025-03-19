import React, { useState } from 'react';
import TransactionService from '../Services/TransactionService';
import { Box, Button, TextField, Typography } from '@mui/material';
import '../styles.css';

const DeleteTransaction = () => {
    const [transactionId, setTransactionId] = useState('');

    const handleChange = (e) => {
        setTransactionId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        TransactionService.deleteTransaction(transactionId)
            .then((response) => {
                alert('Transaction deleted successfully');
                setTransactionId('');
            })
            .catch((error) => {
                alert('There was an error deleting the transaction! ' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Delete Transaction
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Transaction ID"
                    name="transactionId"
                    value={transactionId}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Delete Transaction
                </Button>
            </Box>
        </Box>
    )

    // return (
    //     <>
    //         <h2>Delete Transaction</h2>
    //         <form className="form-container" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label>Transaction ID:</label>
    //                 <input
    //                     type="text"
    //                     name="transactionId"
    //                     value={transactionId}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Delete Transaction</button>
    //         </form>
    //     </>
    // );
};

export default DeleteTransaction;
