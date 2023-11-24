import React, { createContext, useState } from "react";

const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: () => {},
  token: "",
  setToken: () => {},
});

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
