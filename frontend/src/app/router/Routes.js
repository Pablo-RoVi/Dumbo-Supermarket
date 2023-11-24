import React from 'react';
import { Routes as Router, Navigate, Outlet, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../../features/auth/Login';
import UserTable from '../../features/home/UserTable';

const PrivateRoutes = () => {
  const authenticated = localStorage.getItem('token');
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
          <Route path="/user-table" element={
            <div>
              <Navbar />
              <UserTable />
            </div>
          } />
        </Route>
      </Route>
      <Route path="/" element={<Login />} />
    </Router>
  );
};

export default Routes;
