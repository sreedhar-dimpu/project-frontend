import React, { useState } from 'react';
import StockService from '../Services/StockService';
import {
    Box,
    Button,
    FormControl,
    TextField,
    Typography,
} from '@mui/material';
import '../styles.css';

const UpdateStock = () => {
    const [id, setId] = useState('');
    const [stock, setStock] = useState({
        productName: '',
        category: '',
        quantity: '',
        unitPrice: ''
    });

    const handleChange = (e) => {
        setStock({ ...stock, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        StockService.updateStock({ ...stock, id })
            .then((response) => {
                alert('Stock updated successfully');
                setId('');
                setStock({
                    productName: '',
                    category: '',
                    quantity: '',
                    unitPrice: ''
                });
            })
            .catch((error) => {
                alert('There was an error updating the stock! ' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Update Stock
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Stock ID"
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Enter Stock ID"
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Product Name"
                        name="productName"
                        value={stock.productName}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Category"
                        name="category"
                        value={stock.category}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Quantity"
                        type="number"
                        name="quantity"
                        value={stock.quantity}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Unit Price"
                        type="number"
                        name="unitPrice"
                        value={stock.unitPrice}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Update Stock
                </Button>
            </Box>
        </Box>
    );
};

export default UpdateStock;
