import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [adminUsername, setAdminUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [allUsersData, setAllUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get admin username from localStorage
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        if (parsed && parsed.username && parsed.role === "admin") {
          setAdminUsername(parsed.username);
          fetchAdminData(parsed.username);
          return;
        }
      }
      // If not admin, redirect to login
      toast.error("Admin access required");
      navigate("/admin-login");
    } catch (e) {
      console.error("Error reading admin info:", e);
      navigate("/admin-login");
    }
  }, [navigate]);

  const fetchAdminData = async (adminUser) => {
    setLoading(true);
    try {
      console.log("Fetching admin data for:", adminUser);
      
      // Fetch all users with history
      const historyRes = await fetch(
        `http://127.0.0.1:5000/api/admin/all-history?username=${adminUser}`
      );
      const historyData = await historyRes.json();
      console.log("History response:", historyData);

      // Fetch statistics
      const statsRes = await fetch(
        `http://127.0.0.1:5000/api/admin/user-stats?username=${adminUser}`
      );
      const statsData = await statsRes.json();
      console.log("Stats response:", statsData);

      if (historyData.success && statsData.success) {
        setAllUsersData(historyData.users || []);
        setStats(statsData.stats);
      } else {
        const errorMsg = historyData.message || statsData.message || "Failed to fetch admin data";
        console.error("API Error:", errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Network error - could not fetch admin data. Make sure backend is running on http://127.0.0.1:5000");
    } finally {
      setLoading(false);
    }
  };

  const getPredictionColor = (result) => {
    const r = (result || "").toLowerCase();
    if (r.includes("defect")) return "bg-danger";
    if (r.includes("normal")) return "bg-success";
    return "bg-secondary";
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading admin data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header bg-primary text-white p-4">
        <div className="container">
          <h1 className="mb-2">Admin Dashboard</h1>
          <p className="mb-0">Welcome, {adminUsername}</p>
        </div>
      </div>

      <div className="container mt-4">
        {/* Statistics Cards */}
        {stats && (
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="text-primary text-uppercase mb-1">Total Users</div>
                  <h3 className="mb-0">{stats.total_users}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="text-success text-uppercase mb-1">Total Predictions</div>
                  <h3 className="mb-0">{stats.total_predictions}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-left-danger shadow h-100 py-2">
                <div className="card-body">
                  <div className="text-danger text-uppercase mb-1">Defects Detected</div>
                  <h3 className="mb-0">{stats.total_defects}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="text-info text-uppercase mb-1">Normal Items</div>
                  <h3 className="mb-0">{stats.total_normal}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Grid with Predictions */}
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Users & Their Predictions</h2>
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={() => adminUsername && fetchAdminData(adminUsername)}
              disabled={loading}
            >
              <i className="fa fa-refresh"></i> Refresh
            </button>
          </div>

          {allUsersData.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-warning">
                <p>No users data loaded yet.</p>
                <p className="mb-0"><small>Check browser console (F12) for error messages. Backend should be running on http://127.0.0.1:5000</small></p>
              </div>
            </div>
          ) : (
            allUsersData.map((user) => {
              // Get predictions for this user
              const predictions = user.history.filter(
                (h) => h.action === "Image Prediction"
              );

              return (
                <div className="col-lg-4 col-md-6 mb-4" key={user.username}>
                  <div className="card shadow-sm h-100 user-card">
                    {/* User Header */}
                    <div className="card-header bg-light border-0 pt-3 text-center">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&size=100`}
                        alt={user.username}
                        className="rounded-circle border-3"
                        style={{
                          width: 100,
                          height: 100,
                          borderColor: user.role === "admin" ? "#dc3545" : "#0d6efd",
                          borderWidth: 3,
                        }}
                      />
                      <h5 className="mt-3 mb-1">{user.username}</h5>
                      <div className="mb-2">
                        <span
                          className={`badge ${
                            user.role === "admin" ? "bg-danger" : "bg-primary"
                          }`}
                        >
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                      <small className="text-muted d-block">
                        {user.email || "No email"}
                      </small>
                      <small className="text-muted d-block">
                        Joined: {new Date(user.joinDate).toLocaleDateString()}
                      </small>
                    </div>

                    {/* User Stats */}
                    <div className="card-body pt-2">
                      <div className="row text-center mb-3">
                        <div className="col-6">
                          <h6 className="mb-0">{predictions.length}</h6>
                          <small className="text-muted">Total Predictions</small>
                        </div>
                        <div className="col-6">
                          <h6 className="mb-0">{user.defect_count}</h6>
                          <small className="text-muted">Defects</small>
                        </div>
                      </div>

                      <hr className="my-2" />

                      {/* Recent Predictions */}
                      <h6 className="mb-2">Recent Predictions</h6>
                      {predictions.length === 0 ? (
                        <p className="text-muted small mb-0">No predictions yet</p>
                      ) : (
                        <div className="predictions-list">
                          {predictions.slice(0, 3).map((pred, idx) => (
                            <div
                              key={idx}
                              className="prediction-item mb-2 p-2 rounded"
                              style={{
                                backgroundColor:
                                  pred.result.toLowerCase().includes("defect") ||
                                  pred.result.toLowerCase().includes("normal")
                                    ? "rgba(0,0,0,0.05)"
                                    : "#f8f9fa",
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                  {new Date(pred.timestamp).toLocaleDateString()}
                                </small>
                                <span
                                  className={`badge ${getPredictionColor(
                                    pred.result
                                  )}`}
                                >
                                  {pred.result.toUpperCase()}
                                </span>
                              </div>
                              {pred.image_base64 && (
                                <img
                                  src={`data:image/jpeg;base64,${pred.image_base64}`}
                                  alt="prediction"
                                  className="img-fluid mt-2 rounded"
                                  style={{ maxHeight: 80 }}
                                />
                              )}
                            </div>
                          ))}
                          {predictions.length > 3 && (
                            <small className="text-primary cursor-pointer">
                              View all {predictions.length} predictions →
                            </small>
                          )}
                        </div>
                      )}
                    </div>

                    {/* View Details Button */}
                    <div className="card-footer bg-light border-0 pb-3">
                      <button
                        className="btn btn-sm btn-primary w-100"
                        onClick={() => setSelectedUser(user)}
                      >
                        View Full History
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              borderRadius: 8,
              maxWidth: 900,
              maxHeight: 90,
              width: "90%",
              overflow: "auto",
              padding: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>{selectedUser.username}'s Detailed History</h4>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>

            <div className="predictions-detail">
              {selectedUser.history
                .filter((h) => h.action === "Image Prediction")
                .map((pred, idx) => (
                  <div className="card mb-3" key={idx}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          {pred.image_base64 ? (
                            <img
                              src={`data:image/jpeg;base64,${pred.image_base64}`}
                              alt="prediction"
                              className="img-fluid rounded"
                            />
                          ) : (
                            <div className="bg-light p-4 rounded text-center">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h6 className="mb-2">Prediction Details</h6>
                          <p className="mb-1">
                            <strong>Date:</strong>{" "}
                            {new Date(pred.timestamp).toLocaleString()}
                          </p>
                          <p className="mb-1">
                            <strong>Result:</strong>{" "}
                            <span className={`badge ${getPredictionColor(pred.result)}`}>
                              {pred.result}
                            </span>
                          </p>

                          {/* Heatmaps Preview */}
                          {pred.heatmaps && (
                            <div className="mt-2">
                              <h6 className="mb-1">Heatmaps</h6>
                              <div className="row">
                                {pred.heatmaps.original && (
                                  <div className="col-6">
                                    <img
                                      src={`data:image/jpeg;base64,${pred.heatmaps.original}`}
                                      alt="original"
                                      className="img-fluid rounded"
                                      style={{ maxHeight: 150 }}
                                    />
                                    <small className="text-muted d-block text-center">
                                      Original
                                    </small>
                                  </div>
                                )}
                                {pred.heatmaps.overlay && (
                                  <div className="col-6">
                                    <img
                                      src={`data:image/jpeg;base64,${pred.heatmaps.overlay}`}
                                      alt="overlay"
                                      className="img-fluid rounded"
                                      style={{ maxHeight: 150 }}
                                    />
                                    <small className="text-muted d-block text-center">
                                      Overlay
                                    </small>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
