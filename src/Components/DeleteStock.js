import React from 'react';
import StockService from '../Services/StockService';
import { Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const DeleteStock = () => {
    const location = useLocation(); // Access the stock object passed via navigate state
    const navigate = useNavigate();
    const stock = location.state?.stock; // Retrieve the stock object from state

    // Ensure stock exists; redirect to StockList if not found
    if (!stock) {
        alert('No stock selected for deletion.');
        navigate('/'); // Redirect back to StockList if no stock object is found
        return null;
    }

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the stock: ${stock.productName}?`)) {
            StockService.deleteStock(stock.id)
                .then(() => {
                    alert('Stock deleted successfully!');
                    navigate('/'); // Redirect to StockList after deletion
                })
                .catch((error) => {
                    alert('There was an error deleting the stock! ' + error);
                });
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Delete Stock
            </Typography>
            <Typography variant="body1" gutterBottom>
                Are you sure you want to delete this stock?
            </Typography>
            <Typography variant="body2">
                <strong>Product Name:</strong> {stock.productName}
            </Typography>
            <Typography variant="body2">
                <strong>Category:</strong> {stock.category}
            </Typography>
            <Typography variant="body2">
                <strong>Quantity:</strong> {stock.quantity}
            </Typography>
            <Typography variant="body2">
                <strong>Unit Price:</strong> ${stock.unitPrice}
            </Typography>
            <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleDelete}
            >
                Confirm Delete
            </Button>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => navigate('/')} // Navigate back to StockList if canceling
            >
                Cancel
            </Button>
        </Box>
    );
};

export default DeleteStock;