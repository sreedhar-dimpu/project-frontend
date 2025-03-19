import React, { useState } from 'react';
import authService from '../Services/authService';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      await authService.login(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (name, email, password) => {
    try {
      await authService.register(name, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
