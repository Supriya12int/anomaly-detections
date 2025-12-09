import { Navigate, useLocation } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedAdminRoute;
