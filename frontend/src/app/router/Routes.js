import React, { useContext } from "react";
import { Routes as Router, Navigate, Outlet, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../../features/auth/Login";
import UserTable from "../../features/home/UserTable";
import { AuthContext } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const Routes = () => {
  return (
    <Router>
      <Route>
        <Route element={<PrivateRoutes />}>
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
      <Route path="/" element={<Login />} />
    </Router>
  );
};

export default Routes;
