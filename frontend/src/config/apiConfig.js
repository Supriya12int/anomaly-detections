// API Configuration for Frontend
// This file helps manage API URLs across development and production

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiEndpoints = {
  // Authentication
  signup: `${API_BASE_URL}/signup`,
  login: `${API_BASE_URL}/login`,
  
  // Predictions
  predict: `${API_BASE_URL}/predict`,
  
  // User History
  userHistory: (username) => `${API_BASE_URL}/api/user/${username}/history`,
  
  // Admin
  adminAllHistory: `${API_BASE_URL}/api/admin/all-history`,
  adminUserStats: `${API_BASE_URL}/api/admin/user-stats`,
  
  // Static files
  staticImages: (path) => `${API_BASE_URL}/static/${path}`,
};

export default apiEndpoints;
