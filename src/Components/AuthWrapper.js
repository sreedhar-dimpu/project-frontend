import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
// import AccountantApp from '../AccountantApp';
import Login from './Login';
import Register from './Register';

const AuthWrapper = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState('');

    // Synchronize authentication state with localStorage
    useEffect(() => {
        setLoading(true)
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setIsAuthenticated(true);
            setRole(storedRole);
        } else {
            setIsAuthenticated(false);
            setRole('');
        }
        setLoading(false)
    }, []); // Run only on mount

    const handleLoginSuccess = (userRole) => {
        localStorage.setItem('role', userRole); // Save role in localStorage
        setIsAuthenticated(true);
        setRole(userRole); // Update state for immediate reaction
    };

    const handleLogout = () => {
        localStorage.removeItem('role'); // Clear localStorage
        setIsAuthenticated(false);
        setRole(''); // Reset state
    };

    if(loading){
        return <div>Loading</div>
    }
    if(isAuthenticated){
        return(
        <Routes>{
            role === 'Admin' ? (
                <Route path="/*" element={<App onLogout={handleLogout} />} />
            ) : role === 'Accountant' ? (
                <Route path="/*" element={<App onLogout={handleLogout} />} />
            ) : (
                <Route path="*" element={<p>Unknown role. Contact support.</p>} />
            )
            }
        </Routes>
        )
    }
    return (
        <Routes>
            {(
                <>
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </>
            )}
        </Routes>
    );
};

export default AuthWrapper;
