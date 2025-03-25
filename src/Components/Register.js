import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import '../styles.css';
import { Button } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: '',
        businessName: '',
        gstNumber: '',
        address: ''
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
        setIsLoading(true); // Show loading state
        setError(''); // Clear any previous errors
        setSuccess(''); // Clear any previous success messages

        try {
            const { name, email, password, role, businessName, gstNumber, address } = formData;
            const user = { name, email, password, role, businessName, gstNumber, address };

            const response = await UserService.addUser(user);

            if (response.status === 201) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 500); // Redirect after  seconds
            } else {
                throw new Error('Unexpected response from the server');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError(err.message || 'Error during registration. Please try again.');
        } finally {
            setIsLoading(false); // Hide loading state
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            {isLoading && <p className="loading-message">Processing your registration...</p>}

            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required >
                        <option value="">Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="Accountant">Accountant</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Business Name:</label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Enter your business name (optional)"
                    />
                </div>
                <div className="form-group">
                    <label>GST Number:</label>
                    <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        placeholder="Enter your GST number (optional)"
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address (optional)"
                    />
                </div>
                <Button type="submit" disabled={isLoading} variant='contained' fullWidth sx={{marginTop: '1rem'}}>
                    {isLoading ? 'Registering...' : 'Register'}
                </Button>
                <p>
                    Already have an account?{' '}
                    <a href="/login" className="toggle-link">Log in</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
