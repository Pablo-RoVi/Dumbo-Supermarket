import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Routes from "../router/Routes";
import Navbar from '../components/Navbar';
import Home from '../../features/home/Home';
import Login from '../../features/auth/Login';
import UserTable from '../../features/home/UserTable';

function App() {
  return (
    <>
      <Navbar/>
      <UserTable/>
    </>
  );
}

export default App;
