import React, { useState } from "react";
import Form from "../components/Form";
import { useData } from "../context/dataContext";
import Button from "../components/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadPDF } from "../components/DownloadPDF";

const Pemasukan = () => {
	const [formData, setFormData] = useState({
		jumlah: "",
	});

	const [error, setError] = useState(null);
	const { postPredict, pemasukan } = useData();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			// Validasi client-side
			if (!formData.jumlah || isNaN(formData.jumlah)) {
				throw new Error("Masukkan jumlah siswa yang valid");
			}

			await postPredict(formData.jumlah);
		} catch (error) {
			setError(error.message);
			console.error("Prediksi gagal:", error);
		}
	};

	return (
		<section className="container mx-auto p-4">
			<Button className="btn btn-error text-white rounded-lg" onClick={() => window.history.back()} content={"back"} />

			<h1 className="text-center text-2xl font-bold my-4">Prediksi Pemasukan Tahun Ajaran Baru</h1>

			<Form title="Prediksi Pemasukan" onSubmit={handleSubmit} button="Prediksi">
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="jumlah">
						Jumlah Siswa
					</label>
					<input
						type="number"
						id="jumlah"
						name="jumlah"
						min="1"
						value={formData.jumlah}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>
			</Form>

			{error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

			{pemasukan && (
				<>
					<div className="mt-4 p-4 bg-green-100 rounded-md">
						<p className="text-lg">
							Prediksi Pemasukan: <strong>Rp {pemasukan.toLocaleString("id-ID")}</strong>
						</p>
					</div>

					<PDFDownloadLink
						document={<DownloadPDF jumlahSiswa={formData.jumlah} pemasukan={pemasukan} />}
						fileName="prediksi-pemasukan.pdf"
						className="btn btn-primary">
						download pdf
					</PDFDownloadLink>
				</>
			)}
		</section>
	);
};

export default Pemasukan;
