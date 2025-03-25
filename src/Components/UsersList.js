import React, { useEffect, useState } from 'react';
import UserService from '../Services/UserService';
import {
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    TextField,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import navigate hook for routing
import '../styles.css';

const UsersList = () => {
    const [users, setUsers] = useState([]); // Holds user data
    const [filteredUsers, setFilteredUsers] = useState([]); // Holds filtered users
    const [searchTerm, setSearchTerm] = useState(''); // Holds the search input
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook for navigating between components

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserService.getAllUsers();
                setUsers(response.data);
                setFilteredUsers(response.data); // Initially show all users
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredUsers(
            users.filter(
                (user) =>
                    user.name.toLowerCase().includes(term) ||
                    user.email.toLowerCase().includes(term) ||
                    user.role.toLowerCase().includes(term) ||
                    user.businessName.toLowerCase().includes(term) ||
                    user.gstNumber.toLowerCase().includes(term) ||
                    user.address.toLowerCase().includes(term)
            )
        );
    };

    const handleDelete = (userId) => {
        navigate(`/users/delete/${userId}`, { state: { userId } });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
                <Typography variant="body1" sx={{ marginLeft: 2 }}>
                    Loading users...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Users List
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
                <TextField
                    label="Search Users"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by name, email, role, or business..."
                />
            </Box>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Business Name</TableCell>
                            <TableCell>GST Number</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.businessName}</TableCell>
                                <TableCell>{user.gstNumber}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(user.id)} // Pass user ID to DeleteUser
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredUsers.length === 0 && (
                    <Typography variant="body1" sx={{ textAlign: 'center', padding: 2 }}>
                        No users found matching your search criteria.
                    </Typography>
                )}
            </TableContainer>
        </Box>
    );
};

export default UsersList;