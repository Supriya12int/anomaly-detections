import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Feedback.css";

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send `form` data to a backend here
    console.log("Submitted Feedback:", form);
    alert("Thank you for your feedback!");
    setForm({
      name: "",
      email: "",
      rating: "",
      feedback: "",
    });
  };

  return (
    <div className="feedback-page">
      {/* Sidebar */}
      <aside className="sidebar-nav">
        <h2>
          <Link to="/model" className="sidebar-title">Dashboard</Link>
        </h2>
        <ul>
          <li><Link to="/feedback" className="active"><i className="fa-solid fa-comment" /> Feedback</Link></li>
          <li><Link to="/profile"><i className="fa-solid fa-user" /> Profile</Link></li>
          <li><Link to="/history"><i className="fa-solid fa-clock-rotate-left" /> History</Link></li>
        </ul>
      </aside>

      {/* Main Form */}
      <div className="main-content">
      <div className="feedback-container">
        <h2>🔍 Feedback on Anomaly Detection System</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="rating">Rate the System</label>
          <select
            id="rating"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            required
          >
            <option value="">Choose a rating</option>
            <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
            <option value="4">⭐⭐⭐⭐ - Good</option>
            <option value="3">⭐⭐⭐ - Average</option>
            <option value="2">⭐⭐ - Poor</option>
            <option value="1">⭐ - Very Poor</option>
          </select>

          <label htmlFor="feedback">Comments / Suggestions</label>
          <textarea
            id="feedback"
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            placeholder="Write your thoughts..."
          />

          <button type="submit">Submit Feedback</button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Feedback;
