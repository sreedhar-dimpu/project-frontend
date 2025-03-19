import React, { useEffect, useState } from 'react';
import TransactionService from '../Services/TransactionService';
import '../styles.css';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    Paper,
    Alert,
} from '@mui/material';

const GetTransactionById = () => {
    const [transactionId, setTransactionId] = useState('');
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState('');
    const {transactionId: queryTransactionId} = useParams()
    useEffect(() => {
        if(queryTransactionId){
            setTransactionId(queryTransactionId)
            fetchTransactionId(queryTransactionId)
        }
    },[queryTransactionId])

    const handleChange = (e) => {
        setTransactionId(e.target.value);
    };

    const fetchTransactionId = (tid) => {
        TransactionService.getTransactionById(tid)
            .then((response) => {
                setTransaction(response.data);
                setError('');
            })
            .catch((error) => {
                setError('There was an error fetching the transaction: ' + error.message);
                setTransaction(null);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTransactionId(transactionId)
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Get Transaction By ID
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ marginBottom: 2 }}>
                <Card
                    sx={{
                        padding: '1rem',
                        display: 'flex',
                        gap: '20px',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        variant="outlined"
                        label="Transaction ID"
                        error={!!error}
                        type="text"
                        name="transactionId"
                        value={transactionId}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <Button variant="contained" type="submit" fullWidth>
                        Get Transaction
                    </Button>
                </Card>
            </Box>

            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Alert>
            )}

            {transaction && (
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Transaction Details
                    </Typography>
                    <Typography>ID: {transaction.id}</Typography>
                    <Typography>User ID: {transaction.userId}</Typography>
                    <Typography>Type: {transaction.type}</Typography>
                    <Typography>Payment Type: {transaction.paymentType}</Typography>
                    <Typography>Amount: {transaction.amount}</Typography>
                    <Typography>
                        Transaction Date: {new Date(transaction.transactionDate).toLocaleDateString()}
                    </Typography>
                    <Typography>
                        Created At: {new Date(transaction.createdAt).toLocaleString()}
                    </Typography>
                    <Typography>Source: {transaction.source}</Typography>
                    <Typography>Expense Type: {transaction.expenseType}</Typography>
                    <Typography>Quantity: {transaction.quantity}</Typography>
                </Paper>
            )}
        </Box>
    );
    // return (
    //     <>
    //         <h2>Get Transaction By ID</h2>
    //         <form onSubmit={handleSubmit}>
    //         <Card sx={{
    //             padding: '1rem',
    //                 display: 'flex',
    //             gap: '20px',
    //             flexDirection: 'column',
    //             alignItems: 'center'
    //         }}>
    //             <TextField variant="outlined" label="Transaction ID:" error={!!error} type='text' name="transactionId"
    //                         value={transactionId}
    //                         onChange={handleChange}
    //                         required>

    //                 </TextField>
    //                 <Button variant="contained" type="submit">Get Transaction</Button>
    //             </Card>
    //             </form>

    //         {error && <p className="error">{error}</p>}
    //         {transaction && (
    //             <div className="transaction-details">
    //                 <h3>Transaction Details</h3>
    //                 <p>ID: {transaction.id}</p>
    //                 <p>User ID: {transaction.userId}</p>
    //                 <p>Type: {transaction.type}</p>
    //                 <p>Payment Type: {transaction.paymentType}</p>
    //                 <p>Amount: {transaction.amount}</p>
    //                 <p>Transaction Date: {new Date(transaction.transactionDate).toLocaleDateString()}</p>
    //                 <p>Created At: {new Date(transaction.createdAt).toLocaleString()}</p>
    //                 <p>Source: {transaction.source}</p>
    //                 <p>Expense Type: {transaction.expenseType}</p>
    //                 <p>Quantity: {transaction.quantity}</p> {/* New field */}
    //             </div>
    //         )}
    //     </>
    // );
};

export default GetTransactionById;
