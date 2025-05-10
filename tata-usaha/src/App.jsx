/* eslint-disable no-unused-vars */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DaftarMurid from "./pages/DaftarMurid";
import { Routes, Route } from "react-router-dom";
import { useFetchDataSiswa } from "./hooks/FetchDataSiswa";
import Pendaftaran from "./pages/Pendaftaran";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./secure/PrivateRoute";
import NotFound from "./404/NotFound";

function App() {
	// Perbaikan: Pastikan nama property yang didestrukturisasi sesuai
	const { siswa, fetchData, loading } = useFetchDataSiswa();

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<Navbar />

			{/* Konten Utama */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<DaftarMurid onFetch={siswa} onRefresh={fetchData} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/pendaftaran-murid-baru"
					element={
						<PrivateRoute>
							<Pendaftaran />
						</PrivateRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>

			{/* Footer tetap di bawah */}
			<Footer />
		</div>
	);
}

export default App;
