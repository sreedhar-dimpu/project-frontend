import React, { useState } from 'react';
import StockService from '../Services/StockService';
import { Box, Button, TextField, Typography } from '@mui/material';
import '../styles.css';

const DeleteStock = () => {
    const [id, setId] = useState('');

    const handleDelete = () => {
        StockService.deleteStock(id)
            .then(() => {
                alert('Stock deleted successfully');
                setId('');
            })
            .catch((error) => {
                alert('There was an error deleting the stock! ' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Delete Stock
            </Typography>
            <Box component="form" onSubmit={handleDelete} noValidate>
                <TextField
                    label="Stock ID"
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter Stock ID"
                    fullWidth
                    required
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Delete Stock
                </Button>
            </Box>
        </Box>
    );
    // return (
    //     <>
    //         <h2>Delete Stock</h2>
    //         <form className="form-container" onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
    //             <div className="form-group">
    //                 <label>Stock ID:</label>
    //                 <input
    //                     type="number"
    //                     value={id}
    //                     onChange={(e) => setId(e.target.value)}
    //                     placeholder="Enter Stock ID"
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Delete Stock</button>
    //         </form>
    //     </>
    // );
};

export default DeleteStock;
