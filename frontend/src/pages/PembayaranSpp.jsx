import React, { useState } from "react";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { usePembayaran } from "../context/PembayaranSppContext";
import { useSiswa } from "../context/SiswaContext";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";

const PembayaranSpp = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { pembayaranSpp } = usePembayaran();
	const { siswa } = useSiswa();

	const siswaData = siswa.find((s) => s.id === parseInt(id));
	const [nominal, setNominal] = useState(170000);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [selectedMonths, setSelectedMonths] = useState([]);

	const monthOptions = [
		{ id: 1, title: "Januari" },
		{ id: 2, title: "Februari" },
		{ id: 3, title: "Maret" },
		{ id: 4, title: "April" },
		{ id: 5, title: "Mei" },
		{ id: 6, title: "Juni" },
		{ id: 7, title: "Juli" },
		{ id: 8, title: "Agustus" },
		{ id: 9, title: "September" },
		{ id: 10, title: "Oktober" },
		{ id: 11, title: "November" },
		{ id: 12, title: "Desember" },
	];

	const handleCheckboxMonth = (item) => {
		setSelectedMonths((prev) => {
			const isSelected = prev.some((p) => p.id === item.id);
			if (isSelected) {
				return prev.filter((p) => p.id !== item.id);
			} else {
				return [...prev, item];
			}
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			// Kirim satu per satu untuk tiap bulan yang dipilih
			for (const bulan of selectedMonths) {
				await pembayaranSpp({
					id,
					bulan: bulan.title.toLowerCase(),
					tahun: new Date().getFullYear(),
					nominal: Number(nominal),
				});
			}

			setMessage(`Pembayaran untuk bulan ${selectedMonths.map(b => b.title).join(", ")} berhasil`);
			setSelectedMonths([]);
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
				<Button className="btn btn-error text-white mb-4" content="Back" onClick={() => window.history.back()} />

				<div className="mb-4">
					<h1 className="mb-4 font-semibold">{siswaData ? siswaData.nama : "Siswa tidak ditemukan"}</h1>
					<label className="block text-gray-700 mb-2">Bulan yang Dibayar</label>
					<div className="grid grid-cols-2 gap-2">
						{monthOptions.map((item) => (
							<CheckBox
								key={item.id}
								title={item.title}
								checked={selectedMonths.some((p) => p.id === item.id)}
								onChange={() => handleCheckboxMonth(item)}
							/>
						))}
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="uangSpp" className="block text-gray-700 mb-2">Nominal</label>
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
