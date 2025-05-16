import React from "react";
import SideBar from "../components/SideBar";
import Tabel from "../components/Tabel";
import { NavLink } from "react-router-dom";
import { useSiswa } from "../context/SiswaContext";
import { useUtil } from "../context/UtilContext";

const DashBoard = () => {
	const { siswa } = useSiswa();
	const { rupiah, renderStatus, renderAction } = useUtil();

	return (
		<div className="flex min-h-screen">
			{/* Sidebar di kiri */}
			<SideBar title={"Dashboard admin"}>
				<NavLink to="/" className="flex items-center gap-3 hover:text-yellow-400">
					<span>Home</span>
				</NavLink>
				<NavLink to="/dashboard/admin/pendaftaran-murid-baru" className="flex items-center gap-3 hover:text-yellow-400">
					<span>pendaftaran murid baru</span>
				</NavLink>
				<NavLink to="/dashboard/admin/bayar-spp" className="flex items-center gap-3 hover:text-yellow-400">
					<span>Bayar Spp</span>
				</NavLink>
			</SideBar>

			{/* Tabel di kanan, isi halaman */}
			<div className="flex-1 p-4">
				<Tabel
					headers={["No", "Nama", "Kelas", "NISN", "Balance", "Status", "Aksi"]}
					data={siswa}
					searchKeys={["nama", "kelas", "nisn"]}
					renderRow={(currentData) =>
						currentData.map((item, index) => (
							<tr key={item.id}>
								<td>{index + 1}</td>
								<td>{item.nama}</td>
								<td>{item.kelas}</td>
								<td>{item.nisn}</td>
								<td>{rupiah(item.balance)}</td>
								<td>{renderStatus(item.balance)}</td>
								<td>{renderAction(item)}</td>
							</tr>
						))
					}
				/>
			</div>
		</div>
	);
};

export default DashBoard;
