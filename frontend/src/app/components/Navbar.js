/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "../styles/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Navbar component for the application.
 *
 * This component displays the navigation bar with a logo, brand name,
 * and a "Cerrar Sesión" (Logout) button.
 *
 * @returns {JSX.Element} The JSX representation of the Navbar component.
 */
const Navbar = () => {
  // Access the authentication context
  const { setAuthenticated } = useContext(AuthContext);

  // Access the navigate function from react-router-dom
  const navigate = useNavigate();

  /**
   * Handles the logout action.
   * Removes the token from localStorage, sets authentication to false,
   * and navigates the user to the home page.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="container-fluid navbar navbar-expand-lg navbar-primary-green">
      <div className="container" style={{ width: "100%" }}>
        {/* Application Logo */}
        <img
          src="https://vignette.wikia.nocookie.net/logopedia/images/8/8e/Logo-jumbocencosud.png/revision/latest?cb=20160411225506"
          style={{ width: "7vh", height: "7vh", marginRight: "1%" }}
          alt="Application Logo"
        />

        {/* Application Brand Name */}
        <a className="navbar-brand">DUMBO</a>

        {/* Logout Button */}
        <button
          className="nav-link active"
          aria-current="page"
          onClick={() => handleLogout()}
        >
          CERRAR SESIÓN
        </button>
      </div>
    </nav>
  );
};

// Export the Navbar component for use in the application
export default Navbar;
