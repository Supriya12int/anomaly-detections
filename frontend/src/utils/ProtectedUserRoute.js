import { Navigate, useLocation } from 'react-router-dom';

const ProtectedUserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin-dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedUserRoute;