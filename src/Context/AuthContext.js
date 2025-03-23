import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedRole = localStorage.getItem('role');
            const storedUsername = localStorage.getItem('username');
            if (storedRole) {
                setIsAuthenticated(true);
                setRole(storedRole);
                setUsername(storedUsername || '');
            }
        } catch (error) {
            console.error('Error loading auth state from localStorage:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    }, []);

    const login = (userRole, userName) => {
        try {
            localStorage.setItem('role', userRole);
            localStorage.setItem('username', userName);
            setIsAuthenticated(true);
            setRole(userRole);
            setUsername(userName);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('role'); // Clear role from localStorage
            localStorage.removeItem('username'); // Clear username from localStorage
            setIsAuthenticated(false); // Reset authentication state
            setRole(''); // Clear role
            setUsername(''); // Clear username
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, username, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
