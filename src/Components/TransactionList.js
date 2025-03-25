import React, { useEffect, useState } from 'react';
import TransactionService from '../Services/TransactionService';
import { Link } from 'react-router-dom';
import {
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    TextField,
} from '@mui/material';
import { useUser } from '../Context/UserContext';
import '../styles.css';

const TransactionsList = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useUser(); //access the logged in user

    useEffect(() => {
        const fetchTransactions = async () => {
            if (user && user.id) {
                try {
                    const response = await TransactionService.getUserTransactions(user.id);
                    setTransactions(response.data);
                    setFilteredTransactions(response.data); // Initialize filtered transactions
                } catch (error) {
                    console.error('Error fetching transactions:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error('User is not logged in or user ID is missing');
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        setFilteredTransactions(
            transactions.filter(
                (transaction) =>
                    transaction.type.toLowerCase().includes(term) ||
                    transaction.paymentType.toLowerCase().includes(term) ||
                    transaction.source.toLowerCase().includes(term) ||
                    transaction.expenseType.toLowerCase().includes(term) ||
                    (transaction.amount && transaction.amount.toString().includes(term)) ||
                    (transaction.quantity && transaction.quantity.toString().includes(term))
            )
        );
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
                <Typography variant="body1" sx={{ marginLeft: 2 }}>
                    Loading transactions...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Transactions List
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
                <TextField
                    label="Search Transactions"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by type, payment type, source, or expense type..."
                />
            </Box>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>User ID</strong></TableCell>
                            <TableCell><strong>Type</strong></TableCell>
                            <TableCell><strong>Payment Type</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                            <TableCell><strong>Transaction Date</strong></TableCell>
                            <TableCell><strong>Source</strong></TableCell>
                            <TableCell><strong>Expense Type</strong></TableCell>
                            <TableCell><strong>Quantity</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id} hover>
                                <TableCell>
                                    <Link
                                        to={`/transactions/details/${transaction.id}`}
                                        style={{ textDecoration: 'none', color: '#1976d2' }}
                                    >
                                        {transaction.id}
                                    </Link>
                                </TableCell>
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
                {filteredTransactions.length === 0 && (
                    <Typography variant="body1" sx={{ textAlign: 'center', padding: 2 }}>
                        No transactions found matching your search criteria.
                    </Typography>
                )}
            </TableContainer>
        </Box>
    );
};

export default TransactionsList;