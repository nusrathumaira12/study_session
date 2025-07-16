import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole(user?.email);
  const location = useLocation();
  console.log('Current role:', role);
  console.log('Allowed:', allowedRoles);
  
  if (loading || roleLoading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <div className="text-center text-red-500 mt-10">Access Denied</div>;
  }

  return children;
};

export default PrivateRoute;
