import React, { useState, useContext } from "react";
import agent from "../../app/api/agent";
import { AuthContext } from "../../app/context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Login component for user authentication.
 */
const Login = () => {
  // States
  const { setAuthenticated, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error and invalid handling
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState(false);

  /**
   * Handles the login process.
   * @param {Event} e - The submit event.
   */
  const handleLogin = (e) => {
    // Prevent page reload
    e.preventDefault();

    // Validate inputs are not empty
    if (!username || !password) {
      setError(true);
      return;
    }

    // Reset error and invalid state
    setError(false);
    setInvalid(false);

    // Send login request
    agent.requests
      .post("login", { username, password })
      .then((response) => {
        console.log("Login successful!");
        setToken(response.token);
        setAuthenticated(true);
        navigate("/user-table");
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        setInvalid(true);
      });
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#018f45",
        minHeight: "100vh",
        minWidth: "100%",
      }}
    >
      <img
        src="https://vignette.wikia.nocookie.net/logopedia/images/8/8e/Logo-jumbocencosud.png/revision/latest?cb=20160411225506"
        style={{
          width: "20%",
          height: "20%",
          padding: "3%",
          marginLeft: "40%",
        }}
        alt=""
      />
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <h1 className="text-center" style={{ color: "white" }}>
            Iniciar Sesión
          </h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username" style={{ color: "white" }}>
                Nombre de usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ color: "white" }}>
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "#b7c62d", color: "white" }}
            >
              Iniciar sesión
            </button>
          </form>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              Todos los campos son obligatorios.
            </div>
          )}
          {invalid && !error && (
            <div className="alert alert-danger mt-3" role="alert">
              Credenciales incorrectas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
