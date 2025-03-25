import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to UpdateStock
import StockService from '../Services/StockService';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from '@mui/material';
import { useUser } from '../Context/UserContext';
import '../styles.css';

const StockList = () => {
    const [stocks, setStocks] = useState([]); // State to store stock data
    const [loading, setLoading] = useState(true); // Loading state for API calls
    const { user } = useUser(); // Access user details via context
    const navigate = useNavigate(); // For navigation to edit/delete pages

    useEffect(() => {
        const fetchStocks = async () => {
            if (user && user.id) {
                try {
                    const response = await StockService.getStocksByUserId(user.id);
                    setStocks(response.data);
                } catch (error) {
                    console.error('Error fetching stocks:', error);
                    alert('Failed to fetch stocks. Please try again later.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStocks();
    }, []);

    const downloadMonthlyReport = async () => {
        try {
            const year = new Date().getFullYear();
            const month = new Date().getMonth() + 1;
            const response = await StockService.downloadMonthlyReport(year, month);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'monthly_stock_report.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading monthly report:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading stocks...</p>
            </div>
        );
    }
    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Stocks List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Total Value</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocks.map((stock) => (
                            <TableRow key={stock.id}>
                                <TableCell>{stock.productName}</TableCell>
                                <TableCell>{stock.category}</TableCell>
                                <TableCell>{stock.quantity}</TableCell>
                                <TableCell>${stock.unitPrice}</TableCell>
                                <TableCell>${stock.totalValue}</TableCell>
                                <TableCell>{new Date(stock.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{ marginRight: 1 }}
                                        onClick={() =>
                                            navigate(`/inventory/edit/${stock.id}`, { state: { stock }, })}
                                    > 
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => navigate(`/inventory/delete/${stock.id}`, { state: { stock }, })} // Handle Delete
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
    // return (
    //     <div className="stocks-list">
    //         <h2>Stocks List</h2>
    //         <button onClick={downloadMonthlyReport}>Download Monthly Report</button>
    //         <table className="striped">
    //             <thead>
    //                 <tr>
    //                     <th>Product Name</th>
    //                     <th>Category</th>
    //                     <th>Quantity</th>
    //                     <th>Unit Price</th>
    //                     <th>Total Value</th>
    //                     <th>Created At</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {stocks.map((stock) => (
    //                     <tr key={stock.id}>
    //                         <td>{stock.productName}</td>
    //                         <td>{stock.category}</td>
    //                         <td>{stock.quantity}</td>
    //                         <td>${stock.unitPrice}</td>
    //                         <td>${stock.totalValue}</td>
    //                         <td>{new Date(stock.createdAt).toLocaleString()}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );
};

export default StockList;
