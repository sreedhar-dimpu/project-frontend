import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import hooks for routing
import UserService from '../Services/UserService';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
} from '@mui/material';

const DeleteUser = () => {
    const location = useLocation(); // Access state passed from UsersList
    const navigate = useNavigate(); // Hook for redirecting after deletion
    const [userId, setUserId] = React.useState(location.state?.userId || ''); // Prefill userId from state

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.deleteUser(userId)
            .then(() => {
                alert('User deleted successfully');
                navigate('/users'); // Redirect back to UsersList
            })
            .catch((error) => {
                alert('There was an error deleting the user: ' + error.message);
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Delete User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="User ID"
                        name="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="error" fullWidth>
                        Confirm Delete
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default DeleteUser;