import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // sesuaikan path

const Navbar = () => {
	const { admin, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<div className="navbar bg-green-500 text-white">
			<div className="flex-1">
				<NavLink to="/" className="ml-5 text-xl">
					SMA JOMOK Kota Bekasi
				</NavLink>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<NavLink to="/pendaftaran-murid-baru">pendaftaran murid baru</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard">dashboard</NavLink>
					</li>
					<li>
						<details className="dropdown">
							<summary className="btn ">uang kas</summary>
							<ul className="menu dropdown-content bg-base-100 rounded-box text-black">
								<li>
									<a>uang spp</a>
								</li>
								<li>
									<a>Item 2</a>
								</li>
							</ul>
						</details>
					</li>
					{admin ? (
						<li>
							<div className="flex">
								<span>{admin.username || "Admin"}</span>
								<button onClick={handleLogout} className="btn btn-error btn-sm">
									Logout
								</button>
							</div>
						</li>
					) : (
						<li>
							<NavLink to="/login" className="btn btn-primary rounded-lg">
								Login
							</NavLink>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
