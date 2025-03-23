import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import App from '../App'; // Admin panel
import Login from './Login';

const AuthWrapper = () => {
    const { isAuthenticated, role, login, logout, loading } = useAuth(); // Use login from AuthContext
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the `logout` function from AuthContext
        navigate('/login'); // Redirect to login page
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return (
            <Routes>
                {/* Role-based routing */}
                {role === 'Admin' && <Route path="/*" element={<App onLogout={handleLogout} />} />}
                {role === 'Accountant' && <Route path="/*" element={<App onLogout={handleLogout} />} />}
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        );
    }

    return (
        <Routes>
            {/* Pass login function as onLoginSuccess to Login */}
            <Route
                path="/login"
                element={
                    <Login
                        onLoginSuccess={(response) => {
                            login(response.role, response.username); // Set auth state
                            console.log('User logged in:', response);
                        }}
                    />
                }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AuthWrapper;