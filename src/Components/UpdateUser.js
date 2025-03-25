import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Access state and navigate
import UserService from '../Services/UserService';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
} from '@mui/material';

const UpdateUser = () => {
    const location = useLocation(); // Access user details passed from GetUserById
    const navigate = useNavigate(); // Navigate back after successful update
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        role: '',
        business_name: '',
        gst_number: '',
        address: '',
    });

    useEffect(() => {
        // Prefill the form with user details from location.state
        if (location.state && location.state.userDetails) {
            setUser(location.state.userDetails);
        }
    }, [location.state]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.updateUser(user)
            .then(() => {
                alert('User updated successfully');
                navigate('/'); // Redirect to the main page or user list
            })
            .catch((error) => {
                alert('There was an error updating the user: ' + error.message);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Update User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="User ID"
                                name="id"
                                value={user.id}
                                onChange={handleChange}
                                fullWidth
                                disabled // User ID should not be editable
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Role"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Business Name"
                                name="business_name"
                                value={user.business_name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="GST Number"
                                name="gst_number"
                                value={user.gst_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Update User
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default UpdateUser;