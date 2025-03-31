import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoutes';
import { AuthProvider } from "./context/AuthContext";
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import Navbar from './views/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

function Layout() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
