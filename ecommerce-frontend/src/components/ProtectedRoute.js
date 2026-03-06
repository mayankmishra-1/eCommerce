import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, admin }) => {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/login" />;

    if (admin && user.role !== "ADMIN") return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;