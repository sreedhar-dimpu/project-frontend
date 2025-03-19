import React, { useEffect, useState } from 'react';
import RevenueService from '../Services/RevenueService';
import '../styles.css';
import StockService from '../Services/StockService';
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    InputLabel,
} from '@mui/material';

const AddRevenue = () => {
    const [revenue, setRevenue] = useState({
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

    useEffect(() => {
        setRevenue(r => ({...r, source: products[0]}))
    }, [products])

    const handleChange = (e) => {
        setRevenue({ ...revenue, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RevenueService.addRevenue(revenue)
            .then((response) => {
                alert('Revenue added successfully');
                setRevenue({
                    transactionId: '',
                    source: '',
                    amount: '',
                    receivedDate: '',
                    unitsSold: '' // Reset new field
                });
            })
            .catch((error) => {
                alert('There was an error adding the revenue! ' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Add New Sale
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
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
                    Add Revenue
                </Button>
            </Box>
        </Box>
    );
    // return (
    //     <>
    //         <h2>Add New Sale</h2>
    //         <form className="form-container" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label>Transaction ID:</label>
    //                 <input
    //                     type="text"
    //                     name="transactionId"
    //                     value={revenue.transactionId}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Product Name:</label>
    //                 <select 
    //                     name="source"
    //                     value={revenue.source}
    //                     onChange={handleChange}
    //                     required
    //                 >
    //                     {products.map(p => (<option key={p} value={p}>{p}</option>))}
    //                 </select>
    //             </div>
    //             <div className="form-group">
    //                 <label>Amount:</label>
    //                 <input
    //                     type="number"
    //                     name="amount"
    //                     value={revenue.amount}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Received Date:</label>
    //                 <input
    //                     type="date"
    //                     name="receivedDate"
    //                     value={revenue.receivedDate}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Units Sold:</label> {/* New input field */}
    //                 <input
    //                     type="number"
    //                     name="unitsSold"
    //                     value={revenue.unitsSold}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Add Revenue</button>
    //         </form>
    //     </>
    // );
};

export default AddRevenue;
