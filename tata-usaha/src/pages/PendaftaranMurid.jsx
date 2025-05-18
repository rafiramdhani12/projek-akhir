import React, { useEffect, useState } from "react";

import { useSiswa } from "../context/SiswaContext";
import Form from "../components/Form";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";

const PendaftaranMurid = () => {
	const { tambahSiswa } = useSiswa();
	const [formData, setFormData] = useState({
		nama: "",
		kelas: "",
		nisn: "",
		balance: 0,
	});
	const [error, setError] = useState("");

	const paymentItems = [
		{ id: 1, title: "uang daftar", value: 1000000 },
		{ id: 2, title: "uang baju", value: 500000 },
		{ id: 3, title: "uang buku", value: 600000 },
		{ id: 4, title: "uang atribut", value: 400000 },
	];

	const [selectedPayments, setSelectedPayments] = useState([]);

	const handleChexboxChange = (item) => {
		setSelectedPayments((prev) => {
			const isSelected = prev.some((p) => p.id === item.id);

			if (isSelected) {
				return prev.filter((p) => p.id !== item.id);
			} else {
				return [...prev, item];
			}
		});
	};

	useEffect(() => {
		const total = selectedPayments.reduce((sum, item) => sum + item.value, 0);

		if (total > 2500000) {
			setError("Total tidak boleh lebih dari 2.500.000");
		} else {
			setError("");
			setFormData((prev) => ({ ...prev, balance: total }));
		}
	}, [selectedPayments]);

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
		<Form title="Pendaftaran Murid Baru" onSubmit={handleSubmit} error={error} button="Daftar">
			<div className="mb-4">
				<Button
					className={"btn btn-error text-white rounded-lg"}
					onClick={() => window.history.back()}
					content={"back"}>
					back
				</Button>
			</div>
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

			<div className="flex flex-wrap justify-start mb-4 p-5 gap-3 border  rounded-md shadow-lg ">
				{paymentItems.map((item) => (
					<CheckBox
						title={item.title}
						value={item.value}
						checked={selectedPayments.some((p) => p.id === item.id)}
						onChange={() => handleChexboxChange(item)}
					/>
				))}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700 mb-2" htmlFor="balance">
					Uang Daftar (total : Rp {formData.balance.toLocaleString("id-ID")})
				</label>
				<input
					type="number"
					id="balance"
					name="balance"
					value={formData.balance}
					onChange={handleChange}
					className="w-full px-3 py-2 border rounded-md"
					required
					readOnly
					min={0}
					max={2500000}
				/>
			</div>
		</Form>
	);
};

export default PendaftaranMurid;
