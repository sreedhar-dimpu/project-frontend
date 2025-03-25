import React, { useState } from 'react';
import UserService from '../Services/UserService';
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    Paper,
    Grid,
} from '@mui/material';

const AddUser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        business_name: '',
        gst_number: '',
        address: '',
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.addUser(user)
            .then(() => {
                alert('User added successfully');
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    business_name: '',
                    gst_number: '',
                    address: '',
                });
            })
            .catch((error) => {
                alert('There was an error adding the user!' + error);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Add User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                                type="email"
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
                                select
                                label="Role"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                fullWidth
                                required
                            >
                                <MenuItem value="">Select Role</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Accountant">Accountant</MenuItem>
                            </TextField>
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
                                Add User
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddUser;