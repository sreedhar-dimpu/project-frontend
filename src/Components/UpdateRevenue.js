import React, { useEffect, useState } from 'react';
import RevenueService from '../Services/RevenueService';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import '../styles.css';
import StockService from '../Services/StockService';

const UpdateRevenue = () => {
    const [revenue, setRevenue] = useState({
        id: '',
        transactionId: '',
        source: '',
        amount: '',
        receivedDate: '',
        unitsSold: '' // New field
    });

    const [products, setProducts] = useState([])

    useEffect(() => {
        StockService.getAllStocks().then(res => {
            setProducts(res.data.map(product => product.productName))
        })
    },[])

    const handleChange = (e) => {
        setRevenue({ ...revenue, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RevenueService.updateRevenue(revenue)
            .then((response) => {
                alert('Revenue updated successfully');
                setRevenue({
                    id: '',
                    transactionId: '',
                    source: '',
                    amount: '',
                    receivedDate: '',
                    unitsSold: '' // Reset new field
                });
            })
            .catch((error) => {
                alert('There was an error updating the revenue! ' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Update Sale
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Sale ID"
                        name="id"
                        value={revenue.id}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Transaction ID"
                        name="transactionId"
                        value={revenue.transactionId}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Product Name</InputLabel>
                    <Select
                        name="source"
                        value={revenue.source}
                        onChange={handleChange}
                        required
                    >
                        {products.map((p) => (
                            <MenuItem key={p} value={p}>
                                {p}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Amount"
                        type="number"
                        name="amount"
                        value={revenue.amount}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Received Date"
                        type="date"
                        name="receivedDate"
                        value={revenue.receivedDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Units Sold"
                        type="number"
                        name="unitsSold"
                        value={revenue.unitsSold}
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
                    Update Sale
                </Button>
            </Box>
        </Box>
    );
};

export default UpdateRevenue;
