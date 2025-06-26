import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Tabel from "../components/Tabel";
import { NavLink, useNavigate } from "react-router-dom";
import { useSiswa } from "../context/SiswaContext";
import { useUtil } from "../context/UtilContext";
import { useAuth } from "../context/AuthContext";

import { useAdmin } from "../context/AdminContext";
import { useSuperAdmin } from "../context/SuperAdminContext";
import { sendPasswordEmail } from "../../utils/sendPasswordEmail";
import Button from "../components/Button";
import { useTu } from "../context/TuContext";

const DashBoard = () => {
	const { siswa, fetchDataSiswa } = useSiswa();
	const { admin, fetchDataAdmin } = useAdmin();
	const { tataUsaha } = useTu();
	const { superAdmin } = useSuperAdmin();
	const { rupiah, renderStatus, renderAction, handleDeleteAdmin } = useUtil();
	const navigate = useNavigate();

	console.log(siswa);
	const { role, name, id: userId } = useAuth();
	const [swap, setSwap] = useState(false);

	const handleSendPassword = (user) => {
		sendPasswordEmail({
			name: user.name,
			email: user.email,
			password: user.password,
		});
	};

	const handleSwap = () => {
		setSwap(!swap);
	};

	useEffect(() => {
		fetchDataAdmin();
	}, [fetchDataAdmin]);

	useEffect(() => {
		fetchDataSiswa();
	}, [fetchDataSiswa]);

	return (
		<div className="flex min-h-screen">
			{/* Sidebar di kiri */}
			{role === "admin" ? (
				<SideBar role={role} title={`Dashboard ${role}`}>
					<NavLink to="/" className="flex items-center gap-3 hover:text-yellow-400">
						<span>Home</span>
					</NavLink>
					<NavLink to="/" className="flex items-center gap-3 hover:text-yellow-400">
						<span>Home</span>
					</NavLink>
					<NavLink to={`/dashboard/${role}/pendaftaran-murid-baru`} className="flex items-center gap-3 hover:text-yellow-400">
						<span>pendaftaran murid baru</span>
					</NavLink>
					<NavLink to={`/dashboard/${role}/bayar-spp`} className="flex items-center gap-3 hover:text-yellow-400">
						<span>Bayar Spp</span>
					</NavLink>

					<NavLink to={`/dashboard/${role}/prediksi-pemasukan`} className="flex items-center gap-3 hover:text-yellow-400">
						<span>pemasukan</span>
					</NavLink>
					<NavLink to="/dashboard/admin/daftar-tu" className="flex items-center gap-3 hover:text-yellow-400">
						<span>daftar tu</span>
					</NavLink>
				</SideBar>
			) : role === "tata-usaha" ? (
				<SideBar role={role} title={`Dashboard ${role}`}>
					<NavLink to="/" className="flex items-center gap-3 hover:text-yellow-400">
						<span>Home</span>
					</NavLink>
					<NavLink to={`/dashboard/tata-usaha/pendaftaran-murid-baru`} className="flex items-center gap-3 hover:text-yellow-400">
						<span>pendaftaran murid baru</span>
					</NavLink>
					<NavLink to={`/dashboard/tata-usaha/bayar-spp`} className="flex items-center gap-3 hover:text-yellow-400">
						<span>Bayar Spp</span>
					</NavLink>

					<NavLink to="/dashboard/tata-usaha/prediksi-pemasukan" className="flex items-center gap-3 hover:text-yellow-400">
						<span>pemasukan</span>
					</NavLink>
				</SideBar>
			) : (
				<SideBar role={role} title={`Dashboard ${role}`}>
					<NavLink to="/" className="flex items-center gap-3 hover:text-yellow-400">
						<span>Home</span>
					</NavLink>
					{admin.length >= 3 ? null : (
						<NavLink to={`/dashboard/superadmin/tambah-super-admin`} className="flex items-center gap-3 hover:text-yellow-400">
							<span>tambah super admin</span>
						</NavLink>
					)}
					<NavLink to={`/dashboard/superadmin/tambah-admin`} className="flex items-center gap-3 hover:text-yellow-400">
						<span>tambah admin</span>
					</NavLink>
				</SideBar>
			)}

			{/* Tabel di kanan, isi halaman */}
			{role === "superadmin" ? (
				<>
					<div className="flex-1 p-4">
						<h1>
							role : {role} : nama : {name} userId : {userId}
						</h1>
						<div className="swap bg-blue-500 p-2 text-sm text-white  rounded-lg text-center mt-2">
							<label className="swap">
								<input type="checkbox" onChange={handleSwap} />
								<div className="swap-on">admin</div>
								<div className="swap-off">super admin</div>
							</label>
						</div>
						{swap == false ? (
							<>
								<Tabel
									headers={["No", "Name", "Address", "Email", "Phone Number", "Aksi"]}
									data={admin}
									searchKeys={["name", "address", "city", "country"]}
									renderRow={(currentData) =>
										currentData.map((item, index) => (
											<tr key={item.id}>
												<td>{index + 1}</td>
												<td>{item.name}</td>
												<td>{item.address}</td>
												<td>{item.email}</td>
												<td>{item.phoneNumber}</td>
												<td>
													<NavLink to={`/dashboard/superadmin/edit-admin/${item.id}`} className="btn btn-success btn-sm text-white mr-2">
														edit
													</NavLink>
													<button onClick={() => handleDeleteAdmin(item.id)} className="btn btn-error btn-sm text-white">
														Hapus Admin
													</button>
												</td>
											</tr>
										))
									}
								/>
							</>
						) : (
							<>
								<Tabel
									headers={["No", "Name", "Address", "email", "phone number", "Aksi"]}
									data={superAdmin}
									searchKeys={["name", "address", "city", "country"]}
									renderRow={(currentData) =>
										currentData.map((item, index) => (
											<tr key={item.id}>
												<td>{index + 1}</td>
												<td>{item.name}</td>
												<td>{item.address}</td>
												<td>{item.email}</td>
												<td>+{item.phoneNumber}</td>
												<td>{renderAction(item)}</td>
												<td>
													<Button className={"primary"} content={"kirim ulang password"} onClick={() => handleSendPassword(item)} />
												</td>
											</tr>
										))
									}
								/>
							</>
						)}
					</div>
				</>
			) : role === "admin" ? (
				<>
					<div className="flex-1 p-4">
						<>
							<Tabel
								headers={["No", "NISN", "Nama", "Kelas", "Balance", "Status", "Aksi"]}
								data={siswa}
								searchKeys={["nama", "kelas", "nisn"]}
								renderRow={(currentData) =>
									currentData.map((item, index) => (
										<tr key={item.id}>
											<td>{index + 1}</td>
											<td>{item.nisn}</td>
											<td>{item.nama}</td>
											<td>{item.kelas}</td>
											<td>{rupiah(item.balance)}</td>
											<td>{renderStatus(item.balance)}</td>
											<td>{renderAction(item)}</td>
										</tr>
									))
								}
							/>
						</>
					</div>
				</>
			) : role === "tata-usaha" ? (
				<div className="flex-1 p-4">
					<div className="swap bg-blue-500 p-2 text-sm text-white  rounded-lg text-center mt-2">
						<label className="swap">
							<input type="checkbox" onChange={handleSwap} />
							<div className="swap-on">murid</div>
							<div className="swap-off">tata-usaha</div>
						</label>
					</div>
					{swap == false ? (
						<>
							<Tabel
								headers={["No", "NISN", "Nama", "Kelas", "Balance", "Status", "Aksi"]}
								data={siswa}
								searchKeys={["nama", "kelas", "nisn"]}
								renderRow={(currentData) =>
									currentData.map((item, index) => (
										<tr key={item.id}>
											<td>{index + 1}</td>
											<td>{item.nisn}</td>
											<td>{item.nama}</td>
											<td>{item.kelas}</td>
											<td>{rupiah(item.balance)}</td>
											<td>{renderStatus(item.balance)}</td>
											<td>{renderAction(item)}</td>
										</tr>
									))
								}
							/>
						</>
					) : (
						<>
							<Tabel
								headers={["No", "Name", "Address", "Email", "Phone Number", "Aksi"]}
								data={tataUsaha}
								searchKeys={["name", "address", "email"]}
								renderRow={(currentData) =>
									currentData.map((item, index) => (
										<tr key={item.id}>
											<td>{index + 1}</td>
											<td>{item.name}</td>
											<td>{item.address}</td>
											<td>{item.email}</td>
											<td>{item.phoneNumber}</td>
											<td>
												{parseInt(userId) === item.id && (
													<div>
														<NavLink to={`/dashboard/admin/edit-admin/${item.id}`} className="btn btn-success btn-sm text-white mr-2">
															edit
														</NavLink>

														<button onClick={() => navigate(`/ketentuan-resign/${item.id}`)} className="btn btn-error btn-sm text-white">
															resign
														</button>
													</div>
												)}
											</td>
											<td>
												<Button className={"primary"} content={"kirim ulang password"} onClick={() => handleSendPassword(item)} />
											</td>
										</tr>
									))
								}
							/>
						</>
					)}
				</div>
			) : null}
		</div>
	);
};

export default DashBoard;
