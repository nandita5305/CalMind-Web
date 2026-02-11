import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo.png";

const Navbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

      <div className="navbar-logo">
        <img src={logo} alt="CalMind Logo" />
        <span className="calm">Cal</span>
        <span className="mind">Mind</span>
      </div>

      <ul className="navbar-links">
        <li><a href="/features" onClick={(e) => {
            e.preventDefault();
            navigate("/features");
          }}>Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#docs">Docs</a></li>
        <li><a href="#pricing">Pricing</a></li>
      </ul>

      <div className="navbar-actions">
        <a
          href="/register"
          className="account"
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Sign up
        </a>
        <button
          className="login-btn"
          href="/login"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
