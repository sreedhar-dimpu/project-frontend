import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import '../styles.css';

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
                onLoginSuccess(response.role); // Notify AuthWrapper about login

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
        <div className="form-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
                <p>
                    Don't have an account?{' '}
                    <a href="/register" className="toggle-link">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
