/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "../styles/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import agent from "../api/agent";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    agent.token = "";
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-primary-green"
      style={{ width: "100%" }}
    >
      <div className="container" style={{ width: "100%" }}>
        <img
          src="https://vignette.wikia.nocookie.net/logopedia/images/8/8e/Logo-jumbocencosud.png/revision/latest?cb=20160411225506"
          style={{ width: "7vh", height: "7vh", marginRight: "1%" }}
          alt=""
        />
        <a className="navbar-brand">DUMBO</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link active"
                aria-current="page"
                onClick={() => handleLogout()}
              >
                CERRAR SESIÓN
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
