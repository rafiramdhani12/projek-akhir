import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePembayaran } from "../context/PembayaranSppContext";
import Tabel from "../components/Tabel";
import { formatCurrency, formatDate } from "../../utils/formatUtils";
import Button from "../components/Button";
// Buat utility untuk formatting

const History = () => {
	const { id } = useParams();
	const { bayar, currentSiswa, fetchHistoryBySiswaId } = usePembayaran();

	// Load data saat komponen mount atau ID berubah
	useEffect(() => {
		if (id) {
			fetchHistoryBySiswaId(id);
		}
	}, [id, fetchHistoryBySiswaId]);

	if (!currentSiswa) {
		return <div className="p-4">Memuat data siswa...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			{/* Header dengan info siswa */}
			<div className="bg-white shadow-md rounded-lg p-6 mb-6">
				<h1 className="text-2xl font-bold text-gray-800 mb-2">History Pembayaran SPP</h1>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
					<div>
						<p className="text-sm text-gray-500">Nama Siswa</p>
						<p className="font-semibold">{currentSiswa.nama}</p>
					</div>
					<div>
						<p className="text-sm text-gray-500">NISN</p>
						<p className="font-semibold">{currentSiswa.nisn}</p>
					</div>
					<div>
						<p className="text-sm text-gray-500">Kelas</p>
						<p className="font-semibold">{currentSiswa.kelas}</p>
					</div>
				</div>
			</div>

			{/* Tabel history pembayaran */}
			<div className="bg-white shadow-md rounded-lg overflow-hidden p-5">
				<Button onClick={() => window.history.back()} className="btn btn-error text-white p-2 mb-4" content="Kembali" />
				{bayar.length === 0 ? (
					<div className="p-6 text-center text-gray-500">Belum ada riwayat pembayaran untuk siswa ini</div>
				) : (
					<Tabel
						headers={["No", "Bulan", "Tahun", "Status", "Tanggal Bayar", "jam bayar", "Jumlah"]}
						data={bayar}
						searchKeys={["bulan", "tahun", "status"]}
						renderRow={(currentData) =>
							currentData.map((item, index) => (
								<tr key={`${item.id}-${index}`} className="hover:bg-gray-50">
									<td className="py-3 px-4">{index + 1}</td>
									<td className="py-3 px-4">{item.bulan}</td>
									<td className="py-3 px-4">{item.tahun}</td>
									<td className="py-3 px-4">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												item.status === "LUNAS" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
											}`}>
											{item.status}
										</span>
									</td>
									<td className="py-3 px-4">{item.tanggalBayar ? formatDate(item.tanggalBayar) : "-"}</td>
									<td className="py-3 px-4">{item.tanggalBayar ? formatDate(item.tanggalBayar) : "-"}</td>
									<td className="py-3 px-4 font-medium">{item.jumlah ? formatCurrency(item.jumlah) : "-"}</td>
								</tr>
							))
						}
					/>
				)}
			</div>
		</div>
	);
};

export default History;
