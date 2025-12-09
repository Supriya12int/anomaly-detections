// src/pages/Signup.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";
import { checkPasswordStrength } from "../utils/passwordStrength";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, message: '' });
  const [showAdminCode, setShowAdminCode] = useState(false);

  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username, 
          email, 
          password, 
          admin_code: adminCode 
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate(data.role === "admin" ? "/admin-login" : "/login"), 2000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Signup failed, please try again");
      console.error("Signup error", err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light" data-aos="zoom-in">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Choose a username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
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
              placeholder="Create a password"
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

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="adminCheck"
              checked={showAdminCode}
              onChange={() => setShowAdminCode(!showAdminCode)}
            />
            <label className="form-check-label" htmlFor="adminCheck">
              Register as Admin
            </label>
          </div>

          {showAdminCode && (
            <div className="mb-3">
              <label className="form-label">Admin Code</label>
              <input
                type="password"
                className="form-control"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Enter admin secret code"
              />
              <small className="text-muted">Contact system administrator for the code</small>
            </div>
          )}

          <button type="submit" className="btn btn-success w-100">
            Create Account
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
        <ToastContainer position="bottom-left" />
      </div>
    </div>
  );
};

export default Signup;