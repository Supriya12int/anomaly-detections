import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Model from "./pages/Model";
import Solutions from "./pages/Solutions";
import Research from "./pages/Research";
import UnderstandingAD from "./pages/UnderstandingAD";
import Gan from "./pages/Gan";
import Application from "./pages/Application";
import Future from "./pages/Future";
import RealTimeMonitoring from "./pages/RealTimeMonitoring";
import PredictiveMaintenance from "./pages/PredictiveMaintenance";
import AIPoweredInsights from "./pages/AIPoweredInsights";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Feedback from "./pages/Feedback";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUserHistory from "./pages/AdminUserHistory";
import RoleSelection from "./pages/RoleSelection"; // NEW PAGE for selecting role
import AdminLogin from "./pages/AdminLogin";
import PublicRoute from "./utils/PublicRoute";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import Help from './pages/Help'; 


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* Public pages */}
        <Route
          path="/"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/solutions"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Solutions />
            </PublicRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <About />
            </PublicRoute>
          }
        />
        <Route
  path="/admin-dashboard"
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/user/:username"
  element={
    <ProtectedAdminRoute>
      <AdminUserHistory />
    </ProtectedAdminRoute>
  }
/>

        <Route
          path="/contact"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Contact />
            </PublicRoute>
          }
        />

        {/* Role Selection Page */}
        <Route path="/select-role" element={<RoleSelection />} />


        {/* User Login / Signup */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Login / Signup (same components but we can pass role prop) */}
        <Route path="/admin-login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected and general routes */}
        <Route path="/model" element={<Model />} />
        <Route path="/research" element={<Research />} />
        <Route path="/understandingAD" element={<UnderstandingAD />} />
        <Route path="/gan" element={<Gan />} />
        <Route path="/application" element={<Application />} />
        <Route path="/future" element={<Future />} />
        <Route path="/real-time-monitoring" element={<RealTimeMonitoring />} />
        <Route path="/predictive-maintenance" element={<PredictiveMaintenance />} />
        <Route path="/ai-powered-insights" element={<AIPoweredInsights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Admin Dashboard & History */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user/:username" element={<AdminUserHistory />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/help" element={<Help />} />
      


      </Routes>
    </Router>
  );
}

export default App;
//pip install -r requirements.txt
