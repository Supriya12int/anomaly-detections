import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUserHistory = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${username}/history`);
        const data = await response.json();
        
        if (data.success) {
          setUserData(data.user);
          // Process history to ensure detection results are properly formatted
          const processedHistory = data.history.map(item => {
            if (item.action.includes('Image Prediction')) {
              return {
                ...item,
                action: 'Image Detection',
                result: item.result === 'defect' ? 'Defect Detected' : 'Normal',
                details: `Predicted as ${item.result}`
              };
            }
            return item;
          }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          
          setHistory(processedHistory);
        } else {
          toast.error(data.message || "Failed to fetch user history");
          navigate('/admin-dashboard');
        }
      } catch (error) {
        toast.error("Network error - could not fetch history");
        console.error("Error fetching history:", error);
        navigate('/admin-dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [username, navigate]);

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => {
        if (filter === 'login') return item.action.toLowerCase().includes('login');
        if (filter === 'detection') return item.action.toLowerCase().includes('detection');
        if (filter === 'account') return item.action.toLowerCase().includes('account');
        return true;
      });

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      full: date.toLocaleString()
    };
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading user history...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button 
        onClick={() => navigate('/admin-dashboard')}
        className="btn btn-outline-primary mb-4"
      >
        &larr; Back to Dashboard
      </button>

      <div className="card mb-4">
        <div className="card-header d-flex align-items-center">
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`}
            alt={username}
            className="rounded-circle me-3"
            width="80"
            height="80"
          />
          <div>
            <h2 className="mb-1">{username}</h2>
            <div className="d-flex flex-wrap gap-2 mb-1">
              <span className="badge bg-secondary">
                Joined: {formatDateTime(userData.joinDate).date}
              </span>
              <span className="badge bg-info text-dark">
                Last Active: {formatDateTime(userData.lastLogin).full}
              </span>
            </div>
            <p className="mb-0 small">
              <strong>Email:</strong> {userData.email || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Activity History</h4>
          <div className="dropdown">
            <button 
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="filterDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filter: {filter === 'all' ? 'All Actions' : filter}
            </button>
            <ul className="dropdown-menu" aria-labelledby="filterDropdown">
              <li><button className="dropdown-item" onClick={() => setFilter('all')}>All Actions</button></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" onClick={() => setFilter('login')}>Logins</button></li>
              <li><button className="dropdown-item" onClick={() => setFilter('detection')}>Detections</button></li>
              <li><button className="dropdown-item" onClick={() => setFilter('account')}>Account Actions</button></li>
            </ul>
          </div>
        </div>
        <div className="card-body">
          {filteredHistory.length === 0 ? (
            <div className="alert alert-info">
              {filter === 'detection' 
                ? 'No detection history found for this user'
                : 'No activity found for this user'}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                    <th>Result</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((item) => {
                    const datetime = formatDateTime(item.timestamp);
                    const isDetection = item.action.includes('Detection');
                    
                    return (
                      <tr key={item.id}>
                        <td className="text-nowrap">{datetime.date}</td>
                        <td className="text-nowrap">{datetime.time}</td>
                        <td>{item.action}</td>
                        <td>
                          <span className={`badge ${
                            isDetection 
                              ? item.result.includes('Defect') 
                                ? 'bg-danger' 
                                : 'bg-success'
                              : 'bg-primary'
                          }`}>
                            {item.result}
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">
                            {item.details || '-'}
                          </small>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserHistory;