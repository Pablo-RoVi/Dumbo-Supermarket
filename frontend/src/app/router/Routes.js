import React from 'react';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../../features/home/Home';
import Login from '../../features/auth/Login';
import UserTable from '../../features/home/UserTable';

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<UserTable />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Router>
  );
};

export default Routes;
