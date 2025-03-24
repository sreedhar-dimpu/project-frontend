import React, { useEffect, useState } from 'react';
import TransactionService from '../Services/TransactionService';
import '../styles.css';
import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useUser } from '../Context/UserContext'; // Import UserContext to access user data

const TransactionsList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser(); // Access the logged-in user

    useEffect(() => {
        const fetchTransactions = async () => {
            console.log("user1: ", user );
            if (user && user.id) { // Ensure user is logged in and user ID is available
                try {
                    console.log("user2: ", user );
                    const response = await TransactionService.getUserTransactions(user.id); // API call with user ID
                    console.log("user3: ", user );
                    setTransactions(response.data); // Set user-specific transactions
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching transactions:', error);
                    setLoading(false);
                }
            } else {
                console.error('User is not logged in or user ID is missing');
                setLoading(false);
            }
        };

        fetchTransactions(); // Call function to fetch transactions
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading transactions...</p>
            </div>
        );
    }

    return (
        <div className="transactions-list">
            <Typography variant='h4'>Transactions List</Typography>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Payment Type</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Transaction Date</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Expense Type</TableCell>
                        <TableCell>Quantity</TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell><Link to={`/transactions/details/${transaction.id}`} >{transaction.id}</Link></TableCell>
                            <TableCell>{transaction.userId}</TableCell>
                            <TableCell>{transaction.type}</TableCell>
                            <TableCell>{transaction.paymentType}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell>{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                            <TableCell>{transaction.source}</TableCell>
                            <TableCell>{transaction.expenseType}</TableCell>
                            <TableCell>{transaction.quantity}</TableCell> 
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
                </TableContainer>
        </div>
    );
};

export default TransactionsList;
