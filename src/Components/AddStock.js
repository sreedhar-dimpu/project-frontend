import React, { useState } from 'react';
import StockService from '../Services/StockService';
import { Box, Button, TextField, Typography, FormControl } from '@mui/material';
import '../styles.css';

const AddStock = () => {
    const [stock, setStock] = useState({
        productName: '', // corresponds to product_name
        category: '',    // corresponds to category
        quantity: '',    // corresponds to quantity
        unitPrice: ''    // corresponds to unit_price
    });

    const handleChange = (e) => {
        setStock({ ...stock, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        StockService.addStock(stock)
            .then((response) => {
                alert('Stock added successfully');
                setStock({
                    productName: '',
                    category: '',
                    quantity: '',
                    unitPrice: ''
                });
            })
            .catch((error) => {
                alert('There was an error adding the stock!' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Add Stock
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
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
                    Add Stock
                </Button>
            </Box>
        </Box>
    );

    // return (
    //     <>
    //         <h2>Add Stock</h2>
    //         <form className="form-container" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label>Product Name:</label>
    //                 <input
    //                     type="text"
    //                     name="productName"
    //                     value={stock.productName}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Category:</label>
    //                 <input
    //                     type="text"
    //                     name="category"
    //                     value={stock.category}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Quantity:</label>
    //                 <input
    //                     type="number"
    //                     name="quantity"
    //                     value={stock.quantity}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label>Unit Price:</label>
    //                 <input
    //                     type="number"
    //                     name="unitPrice"
    //                     value={stock.unitPrice}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Add Stock</button>
    //         </form>
    //     </>
    // );
};

export default AddStock;
