/* eslint-disable no-unused-vars */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import { useFetchDataSiswa } from "./hooks/FetchDataSiswa";

import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./secure/PrivateRoute";
import NotFound from "./404/NotFound";
import DashBoard from "./pages/DashBoard";
import Pelunasan from "./pages/Pelunasan";
import Spp from "./pages/Spp";
import LayoutPage from "./layout/LayoutPage";
import PendaftaranMurid from "./pages/PendaftaranMurid";
import PembayaranSpp from "./pages/PembayaranSpp";
import History from "./pages/History";
import Pemasukan from "./pages/Pemasukan";
import Test from "./pages/Test";

function App() {
	return (
		<>
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
								<PendaftaranMurid />
							</PrivateRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard/admin/pelunasan/:id" element={<Pelunasan />} />
					<Route path="/dashboard/admin/bayar-spp" element={<Spp />} />
					<Route path="/dashboard/admin/pembayaran/:id" element={<PembayaranSpp />} />
					<Route path="/dashboard/admin/history-pembayaran" element={<History />} />
					<Route path="/dashboard/admin/prediksi-pemasukan" element={<Pemasukan />} />
					<Route path="/test" element={<Test />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</LayoutPage>
		</>
	);
}

export default App;
