import React, { useState } from 'react';
import StockService from '../Services/StockService';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Alert,
} from '@mui/material';
import '../styles.css';

const GetStockById = () => {
    const [stockId, setStockId] = useState('');
    const [stock, setStock] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setStockId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        StockService.getStockById(stockId)
            .then((response) => {
                setStock(response.data);
                setError('');
            })
            .catch((error) => {
                setError('There was an error fetching the stock: ' + error.message);
                setStock(null);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Get Stock By ID
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ marginBottom: 2 }}>
                <TextField
                    label="Stock ID"
                    name="stockId"
                    value={stockId}
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
                    Get Stock
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Alert>
            )}

            {stock && (
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Stock Details
                    </Typography>
                    <Typography>ID: {stock.id}</Typography>
                    <Typography>Product Name: {stock.productName}</Typography>
                    <Typography>Category: {stock.category}</Typography>
                    <Typography>Quantity: {stock.quantity}</Typography>
                    <Typography>Unit Price: {stock.unitPrice}</Typography>
                    <Typography>Total Value: {stock.totalValue}</Typography>
                    <Typography>
                        Created At: {new Date(stock.createdAt).toLocaleString()}
                    </Typography>
                </Paper>
            )}
        </Box>
    );
};

export default GetStockById;
