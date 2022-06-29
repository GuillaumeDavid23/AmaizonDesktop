import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const authTokens =
        JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_AMAIZON")) || null;

    const location = useLocation();
    return !authTokens ? (
        <Navigate to="/login" state={{ from: location }} replace />
    ) : (
        children
    );
};

export default PrivateRoute;
