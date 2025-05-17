import Tabel from "../components/Tabel";
import { usePembayaran } from "../context/PembayaranSppContext";

const History = () => {
	const { history } = usePembayaran();

	console.info(history);

	return (
		<>
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
		</>
	);
};

export default History;
