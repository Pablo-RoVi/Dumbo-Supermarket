import React, { useState, useContext } from "react";
import agent from "../../app/api/agent";
import { AuthContext } from "../../app/context/AuthContext";
import { useNavigate } from "react-router-dom";
// @ts-ignore

const Login = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError(true);
      return;
    }

    setError(false);

    agent.requests.post("login", { username, password })
      .then((response) => {
        console.log("Login successful!");
        agent.token = response;
        localStorage.setItem("token", response);
        setAuthenticated(true);
        navigate("/user-table")
      })
      .catch((error) => console.error("Login failed:", error.message));
  };
  
  return (
    <div className="container" style={{ backgroundColor: "#018f45", minHeight: "100vh", minWidth: "100%" }}>
      <img 
        src="https://vignette.wikia.nocookie.net/logopedia/images/8/8e/Logo-jumbocencosud.png/revision/latest?cb=20160411225506"
        style={{width: "20%", height: "20%", padding: "3%", marginLeft: "40%"}}
        alt=""
      />
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <h1 className="text-center" style={{ color: "white" }}>Iniciar Sesión</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username" style={{ color: "white" }}>Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ color: "white" }}>Contraseña</label>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
