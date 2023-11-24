import React, { createContext, useState, useEffect } from 'react';
import Agent from '../api/agent';

const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: () => {},
});

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the existence of the token when the application loads
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Assign the token to the agent
      Agent.token = storedToken;
      // Set authentication to true
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };