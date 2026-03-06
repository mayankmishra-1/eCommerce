import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <Link to="/">Products</Link>
            {user && user.role === "USER" && <Link to="/cart">Cart</Link>}
            {user && <Link to="/orders">Orders</Link>}
            {user && user.role === "ADMIN" && <Link to="/admin">Admin</Link>}
            {user ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;