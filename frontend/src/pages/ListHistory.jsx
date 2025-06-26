import { NavLink, useNavigate } from "react-router-dom";
import Tabel from "../components/Tabel";

import Button from "../components/Button";
import { useSiswa } from "../context/SiswaContext";
import { useAuth } from "../context/AuthContext";

const ListHistory = () => {
	const { role } = useAuth();
	const { siswa } = useSiswa();
	const navigate = useNavigate();
	console.info(history);

	const handleBack = () => {
		navigate("/dashboard/tata-usaha/bayar-spp");
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between mb-4">
				<button className="btn btn-error text-white" onClick={handleBack}>
					Kembali
				</button>
			</div>

			<Tabel
				headers={["No", "NISN", "Nama", "Kelas", "History"]}
				data={siswa}
				searchKeys={["nama", "siswa", "siswa"]}
				renderRow={(currentData) =>
					currentData.map((item, index) => (
						<tr key={item.id}>
							<td>{index + 1}</td>
							<td>{item.nisn}</td>
							<td>{item.nama}</td>
							<td>{item.kelas}</td>
							<td>
								<NavLink to={`/dashboard/${role}/history-pembayaran/${item.id}`}>
									<Button content={"history"} className={"success"} />
								</NavLink>
							</td>
						</tr>
					))
				}
			/>
		</div>
	);
};

export default ListHistory;
