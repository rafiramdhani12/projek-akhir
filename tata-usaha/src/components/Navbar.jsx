import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ title, link }) => {
	return (
		<div className="navbar bg-green-500 text-white">
			<div className="flex-1">
				<NavLink to="/" className="ml-5 text-xl">
					{title}
				</NavLink>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<NavLink to="/dashboard/admin">{link}</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
