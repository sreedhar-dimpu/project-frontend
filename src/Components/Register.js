import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  MenuItem,
  CircularProgress,
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
    businessName: '',
    gstNumber: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await UserService.addUser(formData);

      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        throw new Error('Unexpected response from the server');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError(err.message || 'Error during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 500, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>
            Register
          </Typography>
          {error && (
            <Typography sx={{ color: 'error.main', textAlign: 'center', marginBottom: '1rem' }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography sx={{ color: 'success.main', textAlign: 'center', marginBottom: '1rem' }}>
              {success}
            </Typography>
          )}
          {isLoading && <CircularProgress sx={{ display: 'block', margin: '0 auto', marginBottom: '1rem' }} />}

          <form onSubmit={handleRegister}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              select
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Accountant">Accountant</MenuItem>
            </TextField>
            <TextField
              label="Business Name (Optional)"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="GST Number (Optional)"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address (Optional)"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              fullWidth
              sx={{ marginTop: '1rem', fontWeight: 'bold' }}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
          <Typography sx={{ textAlign: 'center', marginTop: '1rem' }}>
            Already have an account?{' '}
            <Button
              href="/login"
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                padding: 0,
                color: 'primary.main',
              }}
            >
              Log in
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;