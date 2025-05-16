import React from "react";
import SideBar from "../components/SideBar";

const SidebarLayout = ({ children }) => {
	return (
		<>
			<div className="flex min-h-screen">
				<SideBar />
				<main className="flex-1">{children}</main>
			</div>
		</>
	);
};

export default SidebarLayout;
