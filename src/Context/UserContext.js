import React, { createContext, useContext, useState } from 'react';

// Create the User Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize user as null

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook to Access the Context
export const useUser = () => useContext(UserContext);