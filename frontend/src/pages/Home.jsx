import { NavLink } from "react-router-dom";

import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {

	const {admin} = useAuth();


	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<header className="mb-12 text-center">
					<h1 className="text-4xl font-bold text-blue-800 mb-2">TATA USAHA SMA JIHAD</h1>
					<p className="text-xl text-gray-600">Kota Bekasi</p>
				</header>

				{/* Hero Section */}
				<section className="mb-16">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
						<div className="order-2 md:order-1">
							<h2 className="text-3xl font-semibold text-gray-800 mb-4">Selamat Datang di Website Resmi</h2>
							<p className="text-lg text-gray-600 mb-6">
								SMA JIHAD Kota Bekasi merupakan institusi pendidikan yang berkomitmen untuk memberikan pelayanan terbaik
								dalam bidang administrasi dan tata usaha.
							</p>
							{admin ? (<p>selamat bertugas : <span className="text-green-600 font-semibold">{admin.username}</span></p>) : (	<NavLink
								to="/login"
								className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
								Login
							</NavLink>)}
						
						</div>
						<div className="order-1 md:order-2 overflow-hidden h-64 md:h-80 flex items-center justify-center">
							<img src="public/image/ElmorejrHigh.jpg" alt="sekolah" />
						</div>
					</div>
				</section>

				{/* Yayasan Section */}
				<section className="bg-white p-8 rounded-lg shadow-md mb-16">
					<div className="flex flex-col md:flex-row items-center gap-8">
						<div className="w-full md:w-1/3 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
							<img src="public/image/kepala yayasan.jpg" />
						</div>
						<div className="w-full md:w-2/3">
							<h2 className="text-2xl font-bold text-gray-800 mb-4">Yayasan Bapak Jihad</h2>
							<p className="text-gray-600 mb-4">
								Sebagai penyelenggara pendidikan, Yayasan Bapak jihad telah berkomitmen untuk memajukan pendidikan di
								Kota Bekasi sejak tahun 1985.
							</p>
							<p className="text-gray-600">
								Kami mendukung pengembangan fasilitas pendidikan dan peningkatan kualitas sumber daya manusia di
								lingkungan sekolah.
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
