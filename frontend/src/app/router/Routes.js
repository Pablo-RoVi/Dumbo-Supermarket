import React, { useContext } from "react";
import { Routes as Router, Navigate, Outlet, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../../features/auth/Login";
import UserTable from "../../features/home/UserTable";
import { AuthContext } from "../context/AuthContext";

/**
 * PrivateRoutes component for handling authenticated routes.
 *
 * This component checks the authentication status using the AuthContext.
 * If the user is not authenticated, it redirects to the home page ("/").
 * Otherwise, it renders the child components using the Outlet.
 *
 * @returns {JSX.Element} The JSX representation of the PrivateRoutes component.
 */
const PrivateRoutes = () => {
  // Access the authentication status from the AuthContext
  const { authenticated } = useContext(AuthContext);

  // Redirect to the home page if not authenticated
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  // Render the child components using Outlet if authenticated
  return <Outlet />;
};

/**
 * Routes component for defining application routes.
 *
 * This component sets up the application routes using react-router-dom.
 * It includes a PrivateRoutes component to handle authenticated routes.
 *
 * @returns {JSX.Element} The JSX representation of the Routes component.
 */
const Routes = () => {
  return (
    <Router>
      <Route>
        {/* Wrapping PrivateRoutes to handle authentication for nested routes */}
        <Route element={<PrivateRoutes />}>
          {/* UserTable route with Navbar as its header */}
          <Route
            path="/user-table"
            element={
              <div>
                <Navbar />
                <UserTable />
              </div>
            }
          />
        </Route>
      </Route>

      {/* Login route for users not authenticated */}
      <Route path="/" element={<Login />} />
    </Router>
  );
};

// Export the Routes component for use in other parts of the application
export default Routes;
