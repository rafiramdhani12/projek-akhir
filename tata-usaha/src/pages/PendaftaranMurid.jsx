import React, { useState } from "react";
import FormPendaftaran from "../components/FormPendaftaran";
import { useSiswa } from "../context/SiswaContext";

const PendaftaranMurid = () => {
	const { tambahSiswa } = useSiswa();
	const [formData, setFormData] = useState({
		nama: "",
		kelas: "",
		nisn: "",
		balance: 0,
	});
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "balance" && Number(value) > 2500000) {
			setFormData({ ...formData, balance: 2500000 }); // max 2.5 juta
			setError("Balance tidak boleh lebih dari 2.500.000");
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
			setError("Balance tidak boleh lebih dari 2.500.000");
			return;
		}

		try {
			await tambahSiswa(formData);
			setFormData({ nama: "", kelas: "", nisn: "", balance: 0 });
		} catch (err) {
			alert(`Gagal menambahkan siswa: ${err}`);
		}
	};

	return (
		<FormPendaftaran title="Pendaftaran Murid Baru" onSubmit={handleSubmit} error={error}>
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
				<label className="block text-gray-700 mb-2" htmlFor="balance">
					Uang Daftar
				</label>
				<input
					type="number"
					id="balance"
					name="balance"
					value={formData.balance}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md"
					required
					min={0}
					max={2500000}
				/>
			</div>
		</FormPendaftaran>
	);
};

export default PendaftaranMurid;
