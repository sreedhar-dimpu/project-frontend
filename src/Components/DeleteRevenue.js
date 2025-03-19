import React, { useState } from 'react';
import RevenueService from '../Services/RevenueService';
import { Box, Button, TextField, Typography } from '@mui/material';
import '../styles.css';

const DeleteRevenue = () => {
    const [revenueId, setRevenueId] = useState('');

    const handleChange = (e) => {
        setRevenueId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RevenueService.deleteRevenue(revenueId)
            .then((response) => {
                alert('Revenue deleted successfully');
                setRevenueId('');
            })
            .catch((error) => {
                alert('There was an error deleting the revenue! ' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Delete Sale
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Revenue ID"
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
                    color="error"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Delete Revenue
                </Button>
            </Box>
        </Box>
    );
    // return (
    //     <>
    //         <h2>Delete Sale</h2>
    //         <form className="form-container" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label>Revenue ID:</label>
    //                 <input
    //                     type="text"
    //                     name="revenueId"
    //                     value={revenueId}
    //                     onChange={handleChange}
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Delete Revenue</button>
    //         </form>
    //     </>
    // );
};

export default DeleteRevenue;
