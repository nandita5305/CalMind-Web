// LoginPage.jsx
import React, { useState } from "react";
import "./login.css";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import photo from "../../assets/feature3.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));


      alert("Login successful 🎉");

      // redirect
      window.location.href = "/profile";

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

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

          <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>


          <div className="forgot">Forgot Password?</div>

          <button className="login-btn" onClick={handleLogin}>
            Login 
          </button>

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
            Not a member?{" "}
            <b
              className="register-link"
              onClick={() => window.location.href='/register'}
            >
              Register now
            </b>
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
