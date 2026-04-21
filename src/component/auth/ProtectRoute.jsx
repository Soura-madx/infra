
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  // If no token exists, redirect them to the login page immediately
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in but don't have the right role, show unauthorized
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/advisor" replace />;
  }

  return children;
};

export default ProtectedRoute;