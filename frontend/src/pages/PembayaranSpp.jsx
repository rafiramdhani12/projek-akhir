import React, { useState, useRef, useEffect } from "react";
import Form from "../components/Form";
import { useParams } from "react-router-dom";
import { usePembayaran } from "../context/PembayaranSppContext";
import { useSiswa } from "../context/SiswaContext";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PembayaranSpp = () => {
	const { name } = useAuth();
	const { id } = useParams();
	const { pembayaranSpp } = usePembayaran();
	const { siswa, riwayatPembayaran, fetchPembayaranSpp } = useSiswa();
	const navigate = useNavigate();

	const siswaData = siswa.find((s) => s.id === parseInt(id));
	const [nominal, setNominal] = useState(170000);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [selectedMonths, setSelectedMonths] = useState([]);
	const [validate, setValidate] = useState(false);

	// React to Print
	const contentRef = useRef();
	const handlePrint = useReactToPrint({ contentRef });

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

	const tahunSekarang = new Date().getFullYear();

	// Ambil daftar bulan yang sudah dibayar siswa di tahun ini
	const bulanSudahDibayar =
		riwayatPembayaran?.filter((p) => p.siswa.id === siswaData?.id && p.tahun === tahunSekarang).map((p) => p.bulan.toLowerCase()) || [];

	const handleCheckboxMonth = (item) => {
		// Cek apakah bulan sudah dibayar
		const sudahDibayar = bulanSudahDibayar.includes(item.title.toLowerCase());

		if (sudahDibayar) {
			return; // Jangan lakukan apa-apa jika bulan sudah dibayar
		}

		setSelectedMonths((prev) => {
			const isSelected = prev.some((p) => p.id === item.id);
			if (isSelected) {
				return prev.filter((p) => p.id !== item.id);
			} else {
				return [...prev, item];
			}
		});
	};

	const handleSubmit = async () => {
		if (selectedMonths.length === 0) {
			setMessage("Pilih setidaknya satu bulan untuk dibayar");
			return;
		}

		setLoading(true);
		setMessage("");

		try {
			for (const bulan of selectedMonths) {
				await pembayaranSpp({
					id,
					bulan: bulan.title.toLowerCase(),
					tahun: tahunSekarang,
					nominal: Number(nominal),
				});
			}
			setMessage(`Pembayaran untuk bulan ${selectedMonths.map((b) => b.title).join(", ")} berhasil`);
		} catch (err) {
			setMessage(`Gagal melakukan pembayaran: ${err.response?.data || err.message}`);
		} finally {
			setLoading(false);
			handlePrint();
			navigate("/dashboard/tata-usaha");
		}
	};

	useEffect(() => {
		if (id) fetchPembayaranSpp(id);
	}, [id, fetchPembayaranSpp]);

	return (
		<>
			<Form title="Pembayaran SPP" button={null} onSubmit={(e) => e.preventDefault()} className={"success"}>
				<Button className="btn btn-error text-white mb-4" content="Back" onClick={() => window.history.back()} />

				<div className="mb-4">
					<h1 className="mb-4 font-semibold">{siswaData ? siswaData.nama : "Siswa tidak ditemukan"}</h1>
					<label className="block text-gray-700 mb-2">Bulan yang Dibayar</label>
					<div className="grid grid-cols-2 gap-2">
						{monthOptions.map((item) => {
							const sudahDibayar = bulanSudahDibayar.includes(item.title.toLowerCase());
							return (
								<CheckBox
									key={item.id}
									title={item.title}
									checked={selectedMonths.some((p) => p.id === item.id) || sudahDibayar}
									onChange={() => handleCheckboxMonth(item)}
									disabled={sudahDibayar}
									className={sudahDibayar ? "opacity-50 cursor-not-allowed" : ""}
								/>
							);
						})}
					</div>
					{bulanSudahDibayar.length > 0 && <p className="text-sm text-gray-500 mt-2">Bulan yang sudah dibayar: {bulanSudahDibayar.join(", ")}</p>}
				</div>

				<div className="mb-4">
					<label htmlFor="uangSpp" className="block text-gray-700 mb-2">
						Nominal
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

				<Button
					type="submit"
					className="success"
					content="Bayar"
					onClick={() => {
						if (selectedMonths.length === 0) {
							setMessage("Pilih setidaknya satu bulan untuk dibayar");
							return;
						}
						setValidate(true);
					}}
					disabled={selectedMonths.length === 0}
				/>

				{validate && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
						<div className="bg-white rounded-lg p-6 w-full max-w-md gap-2">
							<h1>nama : {siswaData?.nama}</h1>
							<h1>kelas : {siswaData?.kelas}</h1>
							<h1>nisn : {siswaData?.nisn}</h1>
							<h1>tanggal : {new Date().toLocaleDateString()}</h1>
							<h1>bulan dibayar : {selectedMonths.map((m) => m.title).join(", ")}</h1>
							<h1>nominal : Rp {nominal.toLocaleString("id-ID")}</h1>
							<h1>tata usaha : {name}</h1>
							<Button className="success" content="Cetak dan Bayar" onClick={handleSubmit} loading={loading} />
							<Button className="error" content="Batal" onClick={() => setValidate(false)} />
						</div>
					</div>
				)}
			</Form>

			{message && <div className={`mt-4 p-2 ${message.includes("berhasil") ? "bg-green-100" : "bg-red-100"} rounded`}>{message}</div>}

			{loading && <p className="mt-2 text-gray-500">Memproses pembayaran...</p>}

			<div ref={contentRef} className="p-4 mt-4 bg-white border border-gray-300 w-full max-w-md mx-auto print:block hidden">
				<h2 className="text-lg font-bold mb-2 text-center">Bukti Pembayaran SPP</h2>
				<hr className="mb-2" />
				<p>
					<strong>Nama:</strong> {siswaData?.nama}
				</p>
				<p>
					<strong>NISN:</strong> {siswaData?.nisn}
				</p>
				<p>
					<strong>Tanggal:</strong> {new Date().toLocaleDateString()}
				</p>
				<p>
					<strong>Bulan Dibayar:</strong> {selectedMonths.map((m) => m.title).join(", ")}
				</p>
				<p>
					<strong>Nominal:</strong> Rp {nominal.toLocaleString("id-ID")}
				</p>
				<p>
					<strong>Tata Usaha:</strong> {name}
				</p>
			</div>
		</>
	);
};

export default PembayaranSpp;
