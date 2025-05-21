import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SideBar = ({ title, children }) => {
	const date = new Date();
	const year = date.getFullYear();

	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
			<h2 className="text-2xl font-bold mb-6">{title}</h2>

			<nav className="flex flex-col gap-4">{children}</nav>

			<div>
				<div className="flex items-center gap-3 justify-end ">
					<button onClick={handleLogout} className="btn btn-error btn-sm ">
						Logout
					</button>
				</div>
			</div>

			<div className="mt-auto pt-6 border-t border-gray-600">
				<p className="text-sm text-gray-400">© {year} - Tata Usaha SMA Jomok Kota Bekasi</p>
			</div>
		</div>
	);
};

export default SideBar;
