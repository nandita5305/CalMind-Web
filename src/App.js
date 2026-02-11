import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/NavBar/navbar";
import Home from "./components/Home/home";
import Features from "./components/Features/features";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import ProfilePage from "./components/Profile/profile";
import SessionsPage from "./components/Sessions/SessionsPage"; // Make sure this path is correct
import Sidebar from "./components/Sidebar/sidebar";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  // -------- LANDING PAGE LAYOUT --------
  const LandingPage = () => (
    <>
      {!showLogin && (
        <>
          <Navbar onLoginClick={() => setShowLogin(true)} />
          <Home />
          <div className="horizontal-lines" />
          <Features />
        </>
      )}

      {showLogin && (
        <Login onClose={() => setShowLogin(false)} />
      )}
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onClose={() => setShowLogin(false)} />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes - You can add auth later */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </Router>
  );
}

export default App;