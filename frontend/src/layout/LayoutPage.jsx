import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const LayoutPage = ({ children }) => {
	return (
		<>
			<div className="bg-gray-100 min-h-screen flex flex-col">
				<Navbar title={"Tata Usaha SMA JIHAD"} link={"Dashboard"} link2={"Profil"} />

				<main className="flex-grow">{children}</main>

				<Footer />
			</div>
		</>
	);
};

export default LayoutPage;
