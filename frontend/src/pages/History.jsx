import { useNavigate } from "react-router-dom";
import Tabel from "../components/Tabel";
import { usePembayaran } from "../context/PembayaranSppContext";

const History = () => {
	const { history } = usePembayaran();
	const navigate = useNavigate();
	console.info(history);

	const handleBack = () => {
		navigate("/dashboard/tata-usaha");
	};

	return (
		<>
			<div className="container mx-auto px-4 py-8">
				<button className="btn btn-error text-white" onClick={handleBack}>
					back
				</button>

				<Tabel
					headers={["No", "Nama", "Kelas", "Bulan", "Status", "Tahun", "Tanggal Bayar"]}
					data={history}
					searchKeys={["siswa.nama", "siswa.kelas", "bulan", "tanggal bayar"]}
					renderRow={(currentData) =>
						currentData.map((item, index) => (
							<tr key={item.id}>
								<td>{index + 1}</td>
								<td>{item.siswa?.nama}</td>
								<td>{item.siswa?.kelas}</td>
								<td>{item.bulan}</td>
								<td>{item.status}</td>
								<td>{item.tahun}</td>
								<td>{item.tanggalBayar}</td>
							</tr>
						))
					}
				/>
			</div>
		</>
	);
};

export default History;
