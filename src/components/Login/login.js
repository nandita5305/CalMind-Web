// LoginPage.jsx
import React from "react";
import "./login.css";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import photo from "../../assets/feature3.png"

export default function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-container">

        {/* LEFT — LOGIN FORM */}
        <div className="login-left">
          <h1>Welcome back!</h1>

          <p className="subtitle">
            Your safe space for clarity and calm
            with CalMind<br/> Get started for free.
          </p>

          <input type="text" placeholder="Username" />

          <input type="password" placeholder="Password" />

          <div className="forgot">Forgot Password?</div>

          <button className="login-btn">Login</button>

          <div className="divider">
            <span></span>
            <p>or continue with</p>
            <span></span>
          </div>

          <div className="socials">
            <div className="icon"><FaGoogle /></div>
            <div className="icon"><FaApple /></div>
            <div className="icon"><FaFacebookF /></div>
          </div>

          <p className="register">
            Not a member? <b className="register-link" onClick={() => window.location.href='/register'}>Register now</b>
          </p>
        </div>

        {/* RIGHT — ILLUSTRATION */}
        <div className="login-right">
          <img
            src={photo}
            alt="illustration"
            className="illustration"
          />

          <p className="right-text">
            Build focus, reduce stress, and feel better every day <br />
            with <b>CalMind</b>
          </p>
        </div>

      </div>
    </div>
  );
}

