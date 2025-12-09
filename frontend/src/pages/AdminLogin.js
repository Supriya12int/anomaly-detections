// src/pages/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://127.0.0.1:5000/login", {
      username,
      password,
      is_admin_page: true  // Explicitly identify this as admin login page
    }, {
      withCredentials: true
    });

    if (res.data.success) {
      const userInfo = {
        username: res.data.username,
        role: res.data.role,
        isLoggedIn: true
      };
      console.log("Admin login successful, storing:", userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      
      toast.success("Admin login successful");
      // Force a small delay to ensure localStorage is written
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 100);
    } else {
      toast.error(res.data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    toast.error(err.response?.data?.message || "Login failed");
  }
};



  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Admin Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-danger w-100">
          Login as Admin
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
