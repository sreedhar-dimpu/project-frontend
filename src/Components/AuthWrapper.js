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
    const [username, setUsername] = useState('')

    // Synchronize authentication state with localStorage
    useEffect(() => {
        setLoading(true)
        const storedRole = localStorage.getItem('role');
        const storedname = localStorage.getItem('username')
        setUsername(storedname)
        if (storedRole) {
            setIsAuthenticated(true);
            setRole(storedRole);
        } else {
            setIsAuthenticated(false);
            setRole('');
        }
        setLoading(false)
    }, []); // Run only on mount

    const handleLoginSuccess = (response) => {
        localStorage.setItem('role', response.userRole); // Save role in localStorage
        localStorage.setItem('username', response.username); 
        setIsAuthenticated(true);
        setRole(response.role); // Update state for immediate reaction
    };

    const handleLogout = () => {
        localStorage.removeItem('role'); // Clear localStorage
        localStorage.removeItem('username')
        setIsAuthenticated(false);
        setRole(''); // Reset state
    };

    if(loading){
        return <div>Loading</div>
    }
    if(isAuthenticated){
        return(
        <Routes>{
            <Route path="/*" element={<App onLogout={handleLogout} username={username} />} />
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
