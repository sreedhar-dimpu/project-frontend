import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import '../styles.css';
import { Box, Button, Card, FormControl, TextField, Typography } from '@mui/material';

const Login = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {data: response} = await UserService.loginUser(formData.email, formData.password);
            if (response.role) {
                setSuccess('Login successful! Redirecting...');
                setError('');
                onLoginSuccess(response); // Notify AuthWrapper about login

                // Redirect based on role
                if (response.role === 'Admin') {
                    navigate('/');
                } else if (response.role === 'Accountant') {
                    navigate('/');
                }
            } else {
                throw new Error('Invalid role received from server');
            }
        } catch (err) {
            setError('Invalid email or password');
            setSuccess('');
        }
    };

    return (
        <Box sx={{width: '420px', margin: '2rem auto'}}>
        <Card sx={{padding: '1rem'}}>
            <Typography variant="h2" > Login </Typography>
            {error && <Typography variant="p" color="error">{error}</Typography>}
            {success && <Typography variant="p"  color="success">{success}</Typography>}
            <Box component={'form'} onSubmit={handleLogin}>
                <FormControl fullWidth margin='normal'>
                    <TextField type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email"
                        required variant='standard' />
                </FormControl>
                <FormControl fullWidth margin='normal'>
                    <TextField
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        label="Password"
                        required variant='standard' />
                </FormControl>
                
                <Button type="submit" variant='contained' fullWidth sx={{marginTop: '1rem'}}>Login</Button>
                <Typography variant='p' sx={{marginTop: '1rem', display:"inline-block"}}>
                    Don't have an account?{' '}
                    <Link to="/register" className="toggle-link">Sign up</Link>
                </Typography>
            </Box>
        </Card>
        </Box>
    );
};

export default Login;
