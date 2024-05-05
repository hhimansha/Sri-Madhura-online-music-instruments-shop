// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthContext Provider Component
export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    // Function to set logged-in user's ID
    const login = (userId) => {
        setUserId(userId);
    };

    // Function to clear logged-in user's ID (logout)
    const logout = () => {
        setUserId(null);
    };

    // Value to be provided by AuthContext
    const authValues = {
        userId,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
