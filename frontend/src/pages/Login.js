// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";
import { checkPasswordStrength } from "../utils/passwordStrength";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, message: "" });

  const navigate = useNavigate();
  const location = useLocation();

  // Updated logic to parse role properly
  const avatarData = JSON.parse(localStorage.getItem("selectedAvatar"));
  const avatarRole = avatarData?.role || "user";
  const isAdmin = location.pathname === "/admin-login" || avatarRole === "admin";

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        username, 
        password,
        is_admin_page: false  // Explicitly identify this as user login page
      }),
      credentials: 'include'
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("userInfo", JSON.stringify({
        username,
        role: data.role,
        isLoggedIn: true
      }));
      
      toast.success("Successfully Logged In!");
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/model");  // Redirect to user dashboard
      }, 1500);
    } else {
      toast.error(data.message || "Login failed");
    }
  } catch (err) {
    toast.error("Login failed, please try again");
  }
};

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 ${isAdmin ? "bg-dark text-white" : "bg-light"}`} data-aos="fade-up">
      <div className={`card p-4 shadow-lg rounded-4 ${isAdmin ? "bg-secondary text-white" : ""}`} style={{ width: "400px" }}>
        <h2 className="text-center mb-4">
          {isAdmin ? "🔐 Admin Login" : "User Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder={isAdmin ? "Enter admin username" : "Enter your username"}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Enter your password"
            />
            {password && (
              <div className="mt-2">
                <div className="progress" style={{ height: "5px" }}>
                  <div
                    className={`progress-bar ${
                      passwordStrength.strength < 40
                        ? "bg-danger"
                        : passwordStrength.strength < 70
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                    role="progressbar"
                    style={{ width: `${passwordStrength.strength}%` }}
                  ></div>
                </div>
                <small className={`text-${
                  passwordStrength.strength < 40
                    ? "danger"
                    : passwordStrength.strength < 70
                    ? "warning"
                    : "success"
                }`}>
                  {passwordStrength.message} {passwordStrength.message && "password"}
                </small>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isAdmin ? "Login as Admin" : "Login"}
          </button>
        </form>

        {!isAdmin && (
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <Link to="/signup">Sign up</Link>
            </p>
          </div>
        )}

        <ToastContainer position="bottom-left" />
      </div>
    </div>
  );
};

export default Login;
