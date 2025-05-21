import React, { useState } from "react";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { usePembayaran } from "../context/PembayaranSppContext";
import { useSiswa } from "../context/SiswaContext";

const PembayaranSpp = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { pembayaranSpp } = usePembayaran();
	const { siswa } = useSiswa();

	const siswaData = siswa.find((s) => s.id === parseInt(id));

	const [bulan, setBulan] = useState("");
	const [nominal, setNominal] = useState(170000);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			await pembayaranSpp({
				id,
				bulan,
				tahun: new Date().getFullYear(),
			});
			setMessage(`Pembayaran untuk bulan ${bulan} berhasil`);
			setBulan("");

			navigate("/dashboard/admin/bayar-spp");
		} catch (err) {
			setMessage(`Gagal melakukan pembayaran: ${err.response?.data || err.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Form title="Pembayaran SPP" button="Bayar" onSubmit={handleSubmit}>
				<div className="mb-4">
					<h1 className="mb-4">{siswaData ? siswaData.nama : "tidak ditemukan"}</h1>
					<label htmlFor="bulan" className="block text-gray-700 mb-2">
						Bulan yang Dibayar
					</label>
					<input
						type="text"
						id="bulan"
						name="bulan"
						placeholder="Contoh: Januari"
						value={bulan}
						onChange={(e) => setBulan(e.target.value)}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="uangSpp" className="block text-gray-700 mb-2">
						nominal
					</label>
					<input
						type="number"
						id="uangSpp"
						name="uangSpp"
						value={nominal}
						onChange={(e) => setNominal(e.target.value)}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>
			</Form>

			{message && (
				<div className={`mt-4 p-2 ${message.includes("berhasil") ? "bg-green-100" : "bg-red-100"} rounded`}>
					{message}
				</div>
			)}

			{loading && <p className="mt-2 text-gray-500">Memproses pembayaran...</p>}
		</>
	);
};

export default PembayaranSpp;
