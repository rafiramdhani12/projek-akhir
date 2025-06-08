import { Routes, Route } from "react-router-dom";
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

import DaftarTu from "./pages/DaftarTu";
import AddTu from "./pages/AddTu";
import EditSiswa from "./pages/EditSiswa";
import EditTu from "./pages/EditTu";
import { useAuth } from "./context/AuthContext";

function App() {
	const { role } = useAuth();

	return (
		<>
			<LayoutPage>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route
						path={`/dashboard/${role}`}
						element={
							<PrivateRoute>
								<DashBoard />
							</PrivateRoute>
						}
					/>

					<Route
						path={`/dashboard/${role}/pendaftaran-murid-baru`}
						element={
							<PrivateRoute>
								<PendaftaranMurid />
							</PrivateRoute>
						}
					/>

					<Route path="/login" element={<Login />} />
					<Route path={`/dashboard/${role}/pelunasan/:id`} element={<Pelunasan />} />
					<Route path={`/dashboard/${role}/bayar-spp`} element={<Spp />} />
					<Route path={`/dashboard/${role}/pembayaran/:id`} element={<PembayaranSpp />} />
					<Route path={`/dashboard/${role}/history-pembayaran`} element={<History />} />
					<Route path={`/dashboard/${role}/prediksi-pemasukan`} element={<Pemasukan />} />

					<Route path={`/dashboard/${role}/daftar-tu`} element={<DaftarTu />} />
					<Route path={`/dashboard/${role}/tambah-tu`} element={<AddTu />} />
					<Route path={`/dashboard/${role}/edit-tata-usaha/:id`} element={<EditTu />} />
					<Route path={`/dashboard/${role}/edit-siswa/:id`} element={<EditSiswa />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</LayoutPage>
		</>
	);
}

export default App;
