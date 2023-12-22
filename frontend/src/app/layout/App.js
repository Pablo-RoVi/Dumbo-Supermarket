import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Routes from "../router/Routes";

/**
 * Main App component that sets up the application's structure.
 *
 * This component serves as the root component for the application, wrapping
 * the entire application with BrowserRouter for routing and AuthProvider for
 * managing authentication state.
 *
 * @returns {JSX.Element} The JSX representation of the App component.
 */
function App() {
  return (
    <>
      {/* BrowserRouter provides routing capabilities for the application */}
      <BrowserRouter>
        {/* AuthProvider manages the authentication state for its children */}
        <AuthProvider>
          {/* Routes component handles rendering components based on routes */}
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

// Export the App component for use in the application
export default App;
