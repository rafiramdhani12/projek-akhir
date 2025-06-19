import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadPDF } from "../components/DownloadPDF";
import { useData } from "../context/dataContext";

const Pemasukan = () => {
	const [jumlah, setJumlah] = useState(null);
	const [error, setError] = useState(null);
	const { postPredict, pemasukan } = useData();

	useEffect(() => {
		const fetchAndPredict = async () => {
			try {
				// 1. Ambil semua data siswa dari backend Java
				const res = await axios.get("http://localhost:8080/api/siswa");
				const totalSiswa = res.data.length;

				setJumlah(totalSiswa); // simpan jumlah siswa
				await postPredict(totalSiswa); // 2. Kirim ke Flask untuk prediksi
			} catch (err) {
				setError("Gagal mengambil data siswa atau prediksi");
				console.error(err);
			}
		};

		fetchAndPredict();
	}, [postPredict]);

	return (
		<section className="container mx-auto p-4">
			<Button className="btn btn-error text-white rounded-lg" onClick={() => window.history.back()} content={"back"} />

			<h1 className="text-center text-2xl font-bold my-4">Prediksi Pemasukan Tahun Ajaran Baru</h1>

			{jumlah !== null && (
				<p className="text-center text-lg mb-4">
					Jumlah Siswa Saat Ini: <strong>{jumlah}</strong>
				</p>
			)}

			{error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

			{pemasukan && (
				<>
					<div className="mt-4 p-4 bg-green-100 rounded-md">
						<p className="text-lg">
							Prediksi Pemasukan: <strong>Rp {pemasukan.toLocaleString("id-ID")}</strong>
						</p>
					</div>

					<PDFDownloadLink
						document={<DownloadPDF jumlahSiswa={jumlah} pemasukan={pemasukan} />}
						fileName="laporan-pemasukan.pdf"
						className="btn btn-primary mt-4">
						download pdf
					</PDFDownloadLink>
				</>
			)}
		</section>
	);
};

export default Pemasukan;
