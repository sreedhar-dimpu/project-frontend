import React, { useEffect, useState } from 'react';
import ExpenseService from '../Services/ExpenseService';
import '../styles.css';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from '@mui/material';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await ExpenseService.getAllExpenses();
                setExpenses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching expenses:', error);
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [year, month]);

    const downloadPDF = async () => {
        try {
            const response = await ExpenseService.downloadExpensePDF('monthly-expenses', year, month, true);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'monthly-expenses.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading expenses...</p>
            </div>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Expense List
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={downloadPDF}
                sx={{ marginBottom: 2 }}
            >
                Download PDF
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Expense Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Spent Date</TableCell>
                            <TableCell>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map((expense) => (
                            <TableRow key={expense.id}>
                                <TableCell>{expense.id}</TableCell>
                                <TableCell>
                                    <Link to={`/transactions/details/${expense.transactionId}`}>
                                        {expense.transactionId}
                                    </Link>
                                </TableCell>
                                <TableCell>{expense.expenseType}</TableCell>
                                <TableCell>{expense.amount}</TableCell>
                                <TableCell>{new Date(expense.paidDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(expense.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
    // return (
    //     <div className="expense-list">
    //         <h2>Expense List</h2>
    //         <button onClick={downloadPDF}>Download PDF</button>
    //         <table className="striped">
    //             <thead>
    //                 <tr>
    //                     <th>ID</th>
    //                     <th>Transaction ID</th>
    //                     <th>Expense Type</th>
    //                     <th>Amount</th>
    //                     <th>Spent Date</th>
    //                     <th>Created At</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {expenses.map((expense) => (
    //                     <tr key={expense.id}>
    //                         <td>{expense.id}</td>
    //                         <td><Link to={`/transactions/get-transaction-by-id/${expense.transactionId}`}>{expense.transactionId}</Link></td>
    //                         <td>{expense.expenseType}</td>
    //                         <td>{expense.amount}</td>
    //                         <td>{new Date(expense.paidDate).toLocaleDateString()}</td>
    //                         <td>{new Date(expense.createdAt).toLocaleString()}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );
};

export default ExpenseList;
