/* eslint-disable no-unused-vars */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import { useFetchDataSiswa } from "./hooks/FetchDataSiswa";
import Pendaftaran from "./pages/Pendaftaran";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./secure/PrivateRoute";
import NotFound from "./404/NotFound";
import DashBoard from "./pages/DashBoard";
import Pelunasan from "./pages/Pelunasan";
import Spp from "./pages/Spp";
import LayoutPage from "./layout/LayoutPage";

function App() {
	return (
		<LayoutPage>
			{/* Konten Utama */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/dashboard/admin"
					element={
						<PrivateRoute>
							<DashBoard />
						</PrivateRoute>
					}
				/>
				<Route
					path="/dashboard/admin/pendaftaran-murid-baru"
					element={
						<PrivateRoute>
							<Pendaftaran />
						</PrivateRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard/admin/pelunasan/:id" element={<Pelunasan />} />

				<Route path="/dashboard/admin/bayar-spp" element={<Spp />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</LayoutPage>
	);
}

export default App;
