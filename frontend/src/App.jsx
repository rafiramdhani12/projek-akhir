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
import Test from "./pages/Test";
import TambahSuperAdmin from "./pages/TambahSuperAdmin";
import TambahAdmin from "./pages/TambahAdmin";
import Resign from "./pages/Resign";
import EditAdmin from "./pages/EditAdmin";
import EditSuperAdmin from "./pages/EditSuperAdmin";
import KetentuanResign from "./pages/KetetentuanResign";

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
						path={`/dashboard/tata-usaha/pendaftaran-murid-baru`}
						element={
							<PrivateRoute>
								<PendaftaranMurid />
							</PrivateRoute>
						}
					/>

					<Route path="/login" element={<Login />} />
					<Route path={`/dashboard/tata-usaha/pelunasan/:id`} element={<Pelunasan />} />
					<Route path={`/dashboard/tata-usaha/bayar-spp`} element={<Spp />} />
					<Route path={`/dashboard/tata-usaha/pembayaran/:id`} element={<PembayaranSpp />} />
					<Route path={`/dashboard/tata-usaha/history-pembayaran`} element={<History />} />
					<Route path={`/dashboard/tata-usaha/prediksi-pemasukan`} element={<Pemasukan />} />

					<Route path={`/dashboard/admin/daftar-tu`} element={<DaftarTu />} />
					<Route path={`/dashboard/admin/tambah-tu`} element={<AddTu />} />
					<Route path={`/dashboard/admin/edit-tata-usaha/:id`} element={<EditTu />} />
					<Route path={`/dashboard/admin/edit-siswa/:id`} element={<EditSiswa />} />

					<Route path={`/dashboard/superadmin/tambah-super-admin`} element={<TambahSuperAdmin />} />
					<Route path={`/dashboard/superadmin/tambah-admin`} element={<TambahAdmin />} />
					<Route path={`/dashboard/superadmin/edit-admin/:id`} element={<EditAdmin />} />
					<Route path={`/dashboard/superadmin/edit-super-admin/:id`} element={<EditSuperAdmin />} />
					<Route path={`/ketentuan-resign/:id`} element={<KetentuanResign />} />
					<Route path={`/resign`} element={<Resign />} />
					<Route path={`/test`} element={<Test />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</LayoutPage>
		</>
	);
}

export default App;
