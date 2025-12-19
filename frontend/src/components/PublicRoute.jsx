import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (user) {
    // Redirect authenticated users to their appropriate dashboard
    const redirectPath = user.role === 'doctor' ? '/doctor/home' : '/patient/home';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;