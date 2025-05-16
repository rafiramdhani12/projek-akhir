import React, { useState } from "react";
import { useSiswa } from "../context/SiswaContext";

const FormPendaftaran = () => {
	const { tambahSiswa } = useSiswa();
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		nama: "",
		kelas: "",
		nisn: "",
		balance: 0,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "balance" && Number(value) > 2500000) {
			setFormData({ ...formData, balance: 2500000 }); // set balance max 2500000
			setError("balance tidak boleh lebih dari 2.500.000");
			return;
		}

		setFormData({
			...formData,
			[name]: value,
		});

		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.balance > 2500000) {
			setError("balance tidak boleh lebih dari 2.500.000");
			return;
		}

		try {
			await tambahSiswa(formData);
			setFormData({ nama: "", kelas: "", nisn: "", balance: 0 });
		} catch (err) {
			alert(`gagal menambahkan siswa : ${err}`);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-5 mb-5">
			<h2 className="text-xl font-semibold mb-4">Pendaftaran Murid Baru</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="nama">
						Nama Lengkap
					</label>
					<input
						type="text"
						id="nama"
						name="nama"
						value={formData.nama}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="kelas">
						Kelas
					</label>
					<input
						type="text"
						id="kelas"
						name="kelas"
						value={formData.kelas}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="nisn">
						NISN
					</label>
					<input
						type="text"
						id="nisn"
						name="nisn"
						value={formData.nisn}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="nisn">
						uang daftar
					</label>
					<input
						type="number"
						id="balance"
						name="balance"
						value={formData.balance}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>

				<button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
					Daftar
				</button>
				{error && <p className="text-red-500 mt-2">{error}</p>}
			</form>
		</div>
	);
};

export default FormPendaftaran;
