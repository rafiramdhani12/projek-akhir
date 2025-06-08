import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
	const { token , isHydrated } = useAuth(); // ambil token, bukan admin

	 if (!isHydrated) return <div>Loading...</div>; // atau spinner

	return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
