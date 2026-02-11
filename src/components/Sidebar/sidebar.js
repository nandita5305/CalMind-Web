import React, { useEffect, useState } from "react";
import "./sidebar.css";
import logo from "../../assets/logo.png";
import {
  FaHome,
  FaSignInAlt,
  FaLeaf,
  FaBrain,
  FaCalendarCheck,
  FaChartLine,
  FaHeart
} from "react-icons/fa";

const Sidebar = ({ onLoginClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#dashboard");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      
      {/* LOGO */}
      <div className="navbar-logo">
        <img src={logo} alt="CalMind Logo" />
        <span className="calm">Cal</span>
        <span className="mind">Mind</span>
      </div>

      {/* LINKS */}
      <ul className="navbar-links">
        <li>
          <a
            href="#dashboard"
            className={activeLink === "#dashboard" ? "active" : ""}
            onClick={() => setActiveLink("#dashboard")}
          >
            <FaHome className="nav-icon" />
            Dashboard
          </a>
        </li>

        <li>
          <a
            href="#sessions"
            className={activeLink === "#sessions" ? "active" : ""}
            onClick={() => setActiveLink("#sessions")}
          >
            <FaBrain className="nav-icon" />
            Sessions
          </a>
        </li>

        <li>
          <a
            href="#calendar"
            className={activeLink === "#calendar" ? "active" : ""}
            onClick={() => setActiveLink("#calendar")}
          >
            <FaCalendarCheck className="nav-icon" />
            Calendar
          </a>
        </li>

        <li>
          <a
            href="#progress"
            className={activeLink === "#progress" ? "active" : ""}
            onClick={() => setActiveLink("#progress")}
          >
            <FaChartLine className="nav-icon" />
            Progress
          </a>
        </li>

        <li>
          <a
            href="#mindfulness"
            className={activeLink === "#mindfulness" ? "active" : ""}
            onClick={() => setActiveLink("#mindfulness")}
          >
            <FaHeart className="nav-icon" />
            Mindfulness
          </a>
        </li>
      </ul>

      {/* FOOTER */}
      <div className="navbar-footer">
        <div className="user-profile-mini">
          <div className="user-avatar">
            <span>AM</span>
          </div>
          <div className="user-info">
            <div className="user-name">Alex Morgan</div>
            <div className="user-status">
              <span className="status-dot"></span>
              Premium Member
            </div>
          </div>
        </div>

        <div className="navbar-actions">
          <button className="login-btn" onClick={onLoginClick}>
            <FaSignInAlt className="btn-icon" />
            Sign Out
          </button>
        </div>

        <div className="mindfulness-quote">
          <FaLeaf className="quote-icon" />
          <p>"Peace comes from within"</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
