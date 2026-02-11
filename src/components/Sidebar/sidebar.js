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
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("dashboard");
  const [user, setUser] = useState(null);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync active link with current route path
  useEffect(() => {
    if (location.pathname.startsWith("/sessions")) {
      setActiveLink("sessions");
    } else if (location.pathname.startsWith("/profile")) {
      setActiveLink("dashboard");
    }
  }, [location.pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

  return (
    <nav className={`sidebar-nav ${scrolled ? "scrolled" : ""}`}>
      
      {/* LOGO */}
      <div className="sidebar-logo">
        <img src={logo} alt="CalMind Logo" />
        <span className="calm">Cal</span>
        <span className="mind">Mind</span>
      </div>

      {/* LINKS */}
      <ul className="sidebar-links">
        <li>
          <a
            href="/profile"
            className={activeLink === "dashboard" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("dashboard");
              navigate("/profile");
            }}
          >
            <FaHome className="nav-icon" />
            Dashboard
          </a>
        </li>

        <li>
          <a
            href="/sessions"
            className={activeLink === "sessions" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink("sessions");
              navigate("/sessions");
            }}
          >
            <FaBrain className="nav-icon" />
            Sessions
          </a>
        </li>

        <li>
          <a
            href="#calendar"
            className={activeLink === "calendar" ? "active" : ""}
            onClick={() => setActiveLink("calendar")}
          >
            <FaCalendarCheck className="nav-icon" />
            Calendar
          </a>
        </li>

        <li>
          <a
            href="#progress"
            className={activeLink === "progress" ? "active" : ""}
            onClick={() => setActiveLink("progress")}
          >
            <FaChartLine className="nav-icon" />
            Progress
          </a>
        </li>

        <li>
          <a
            href="#mindfulness"
            className={activeLink === "mindfulness" ? "active" : ""}
            onClick={() => setActiveLink("mindfulness")}
          >
            <FaHeart className="nav-icon" />
            Mindfulness
          </a>
        </li>
      </ul>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <div className="user-profile-mini">
          <div className="user-avatar">
          <span>
            {user?.fullName
              ? user.fullName
                  .trim()
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map(name => name[0].toUpperCase())
                  .join("")
              : "U"}
          </span>

          </div>
          <div className="user-info">
            <div className="user-name">{user?.fullName}</div>
            <div className="user-status">
              <span className="status-dot"></span>
              Premium Member
            </div>
          </div>
        </div>

        <div className="sidebar-actions">
          <button
            className="sidebar-login-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
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
