import React, { createContext, useState } from "react";

// Create an authentication context with default values
const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: () => {},
  token: "",
  setToken: () => {},
});

/**
 * AuthProvider component for managing authentication state.
 *
 * This component provides the AuthContext to its children and manages
 * the state related to authentication, including 'authenticated' and 'token'.
 *
 * @param {object} props - React component properties.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the AuthProvider.
 * @returns {JSX.Element} The JSX representation of the AuthProvider component.
 */
const AuthProvider = ({ children }) => {
  // State to track the authentication status
  const [authenticated, setAuthenticated] = useState(false);

  // State to store the authentication token
  const [token, setToken] = useState("");

  /**
   * AuthContext.Provider is used to provide the authentication context
   * and the associated values to its children components.
   * The 'value' prop contains the current values of 'authenticated', 'setAuthenticated',
   * 'token', and 'setToken'.
   */
  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext and AuthProvider for use in the application
export { AuthContext, AuthProvider };
