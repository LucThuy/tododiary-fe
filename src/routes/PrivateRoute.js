import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
