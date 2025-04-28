import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useContext(TokenContext);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
