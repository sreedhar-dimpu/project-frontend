import React, { useState } from 'react';
import RevenueService from '../Services/RevenueService';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Alert,
} from '@mui/material';
import '../styles.css';

const GetRevenueById = () => {
    const [revenueId, setRevenueId] = useState('');
    const [revenue, setRevenue] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setRevenueId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RevenueService.getRevenueById(revenueId)
            .then((response) => {
                setRevenue(response.data);
                setError('');
            })
            .catch((error) => {
                setError('There was an error fetching the revenue: ' + error.message);
                setRevenue(null);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Find Sale By ID
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ marginBottom: 2 }}>
                <TextField
                    label="Sale ID"
                    name="revenueId"
                    value={revenueId}
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
                    Get Sale
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Alert>
            )}

            {revenue && (
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Revenue Details
                    </Typography>
                    <Typography>ID: {revenue.id}</Typography>
                    <Typography>Transaction ID: {revenue.transactionId}</Typography>
                    <Typography>Product Name (Source): {revenue.source}</Typography>
                    <Typography>Amount: {revenue.amount}</Typography>
                    <Typography>
                        Received Date: {new Date(revenue.receivedDate).toLocaleDateString()}
                    </Typography>
                    <Typography>
                        Created At: {new Date(revenue.createdAt).toLocaleString()}
                    </Typography>
                    <Typography>Units Sold: {revenue.unitsSold}</Typography>
                </Paper>
            )}
        </Box>
    );
    // return (
    //     <>
    //         <h2>Find Sale By ID</h2>
    //         <form className="form-container" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label>Sale ID:</label>
    //                 <input
    //                     type="text"
    //                     name="revenueId"
    //                     value={revenueId}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Get Sale</button>
    //         </form>

    //         {error && <p className="error">{error}</p>}
    //         {revenue && (
    //             <div className="revenue-details">
    //                 <h3>Revenue Details</h3>
    //                 <p>ID: {revenue.id}</p>
    //                 <p>Transaction ID: {revenue.transactionId}</p>
    //                 <p>Product Name (Source): {revenue.source}</p>
    //                 <p>Amount: {revenue.amount}</p>
    //                 <p>Received Date: {new Date(revenue.receivedDate).toLocaleDateString()}</p>
    //                 <p>Created At: {new Date(revenue.createdAt).toLocaleString()}</p>
    //                 <p>Units Sold: {revenue.unitsSold}</p> {/* New field */}
    //             </div>
    //         )}
    //     </>
    // );
};

export default GetRevenueById;
