import React, { createContext, useState, useEffect } from 'react';
import agent from "../api/agent";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar la existencia del token al cargar la aplicación
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Asignar el token al agente
      agent.token = storedToken;
      // Limpiar el token en el agente
      setAuthenticated(true);
    }
  }, []);

  const value = { authenticated, setAuthenticated };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
