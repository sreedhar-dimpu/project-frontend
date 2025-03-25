import React, { useState, useEffect } from 'react';
import { useUser } from '../Context/UserContext'; // Access user details via context
import UserService from '../Services/UserService';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    TextField,
    Grid,
} from '@mui/material';

const GetUserById = () => {
    const { user } = useUser(); // Get the logged-in user's details
    const [userDetails, setUserDetails] = useState(null); // Holds fetched user data
    const [error, setError] = useState(''); // Error message for any issues while fetching data
    const [loading, setLoading] = useState(true); // Loading state for feedback
    const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
    const [updatedUser, setUpdatedUser] = useState({}); // Holds user data for updating

    useEffect(() => {
        if (user && user.id) {
            UserService.getUserById(user.id)
                .then((response) => {
                    setUserDetails(response.data); // Populate user details
                    setUpdatedUser(response.data); // Prefill the editable form data
                    setError(''); // Clear errors
                })
                .catch((error) => {
                    setError('Error fetching user details: ' + error.message);
                    setUserDetails(null); // Clear details on error
                })
                .finally(() => {
                    setLoading(false); // Turn off loading spinner
                });
        } else {
            setError('User is not logged in or no user ID is available.');
            setLoading(false);
        }
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing); // Toggle the editing mode
    };

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        UserService.updateUser(updatedUser)
            .then(() => {
                alert('User updated successfully');
                setUserDetails(updatedUser); // Update the displayed user details
                setIsEditing(false); // Exit editing mode
            })
            .catch((error) => {
                alert('There was an error updating the user: ' + error.message);
            });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="body1" sx={{ marginLeft: 2 }}>
                    Loading user details...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Get User By ID
            </Typography>
            {error && (
                <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}
            {!isEditing && userDetails ? (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Field</strong></TableCell>
                                <TableCell><strong>Value</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>{userDetails.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{userDetails.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{userDetails.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Role</TableCell>
                                <TableCell>{userDetails.role}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Business Name</TableCell>
                                <TableCell>{userDetails.businessName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>GST Number</TableCell>
                                <TableCell>{userDetails.gstNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>{userDetails.address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Created At</TableCell>
                                <TableCell>{new Date(userDetails.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : null}
            {isEditing && (
                <Box component="form" onSubmit={handleUpdate} sx={{ marginTop: 3 }}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={updatedUser.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={updatedUser.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Role"
                                    name="role"
                                    value={updatedUser.role}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Business Name"
                                    name="businessName"
                                    value={updatedUser.businessName}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="GST Number"
                                    name="gstNumber"
                                    value={updatedUser.gstNumber}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={updatedUser.address}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Save Changes
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            )}
            <Button
                variant={isEditing ? 'outlined' : 'contained'}
                color={isEditing ? 'error' : 'primary'}
                sx={{ marginTop: 3 }}
                onClick={handleEditToggle}
            >
                {isEditing ? 'Cancel Editing' : 'Edit User'}
            </Button>
        </Box>
    );
};

export default GetUserById;