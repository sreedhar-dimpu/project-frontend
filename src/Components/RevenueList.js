import React, { useEffect, useState } from 'react';
import RevenueService from '../Services/RevenueService';
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
import '../styles.css';

const RevenueList = () => {
    const [revenues, setRevenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        const fetchRevenues = async () => {
            try {
                const response = await RevenueService.getAllRevenues();
                setRevenues(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching revenues:', error);
                setLoading(false);
            }
        };

        fetchRevenues();
    }, [year, month]);

    const downloadPDF = async () => {
        try {
            const response = await RevenueService.downloadRevenuePDF('monthly-revenue', year, month, false);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'monthly-revenue.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const downloadReceipt = async (revenueId) => {
        try {
            const response = await RevenueService.downloadReceipt(revenueId);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `receipt_${revenueId}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading receipt:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading revenues...</p>
            </div>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                All Sales
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
                            <TableCell>Source</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Received Date</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Units Sold</TableCell>
                            <TableCell>Receipt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {revenues.map((revenue) => (
                            <TableRow key={revenue.id}>
                                <TableCell>{revenue.id}</TableCell>
                                <TableCell>{revenue.transactionId}</TableCell>
                                <TableCell>{revenue.source}</TableCell>
                                <TableCell>{revenue.amount}</TableCell>
                                <TableCell>{new Date(revenue.receivedDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(revenue.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{revenue.unitsSold}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => downloadReceipt(revenue.id)}
                                    >
                                        Download
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
    //     <div className="revenue-list">
    //         <h2>All Sales</h2>
    //         <button onClick={downloadPDF}>Download PDF</button>
    //         <table className="striped">
    //             <thead>
    //                 <tr>
    //                     <th>ID</th>
    //                     <th>Transaction ID</th>
    //                     <th>Source</th>
    //                     <th>Amount</th>
    //                     <th>Received Date</th>
    //                     <th>Created At</th>
    //                     <th>Units Sold</th>
    //                     <th>Receipt</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {revenues.map((revenue) => (
    //                     <tr key={revenue.id}>
    //                         <td>{revenue.id}</td>
    //                         <td>{revenue.transactionId}</td>
    //                         <td>{revenue.source}</td>
    //                         <td>{revenue.amount}</td>
    //                         <td>{new Date(revenue.receivedDate).toLocaleDateString()}</td>
    //                         <td>{new Date(revenue.createdAt).toLocaleString()}</td>
    //                         <td>{revenue.unitsSold}</td>
    //                         <td>
    //                             <button onClick={() => downloadReceipt(revenue.id)}>Download</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );
};

export default RevenueList;
