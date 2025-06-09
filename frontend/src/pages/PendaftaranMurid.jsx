import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import CetakPembayaran from "./CetakPembayaran";
import { useUtil } from "../context/UtilContext";
import { useNavigate, useParams } from "react-router-dom";

const PendaftaranMurid = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		paymentItems,
		addPaymentItems,
		loading,
		formOption,
		setFormOption,
		fetchPaymentItems,
		error,
		contentRef,
		formData,
		setFormData,
		setError,
		handleSubmitAndPrint,
		selectedPayments,
		setSelectedPayments,
		selectedClass,
		setSelectedClass,
	} = useUtil();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
	const [isEditPaymentModalOpen, setIsEditPaymentOpen] = useState(false);
	const [editId, setEditId] = useState(null);

	const dataPayment = paymentItems.find((s) => s.id === parseInt(id));
	// memfilter dataPayment dengan id tertentu

	useEffect(() => {
		if (dataPayment) {
			setFormOption({
				title: dataPayment.title,
				value: dataPayment.value,
			});
		}
	}, [dataPayment]);
	// ini adalah useEffect yg guna nya untuk memantau state yg diubah dengan alur jika dataPayment ada nilainya maka setFormOption yg mengandung title dan value dan dirender dengan depedency [] yg maksudnya dirender setiap state payment item nya berubah

	const classOptions = [
		{ id: 1, title: "10 IPA 1" },
		{ id: 2, title: "10 IPA 2" },
		{ id: 3, title: "10 IPA 3" },
		{ id: 4, title: "10 IPA 4" },
		{ id: 5, title: "10 IPS 1" },
		{ id: 6, title: "10 IPS 2" },
		{ id: 7, title: "10 IPS 3" },
		{ id: 8, title: "10 IPS 4" },
	];

	const handleCheckboxClass = (item) => {
		setSelectedClass((prev) => {
			// parameter setSelectedClass disini mengandung function select berdasarkan id dan update
			const isSelected = prev.some((p) => p.id === item.id);
			const updated = isSelected ? prev.filter((p) => p.id !== item.id) : [...prev, item];
			// yg dimana update ini jika di select akan merender function filter jika tidak akan merender hasil dari spread operator dan item

			setFormData((prevForm) => ({
				...prevForm,
				kelas: updated.map((k) => k.title).join(", "),
			}));
			// pada bagian ini setFormData memiliki parameter prevForm yg dmn maksudnya adalah mengambil data sebelumnya dan digabung menggunakan spread operator dan properti kelas berisi variable update yg dimap untuk mengambil title row di database dan di join

			return updated;
			// yg terakhir mengembalikan nilai update
		});
	};

	const handleCheckboxChange = (item) => {
		// yg disini kurang lebih juga sama jadi handle ini akan mengambil nilai item dengan parameternya lalu didalamnya ada setSelectedPayment yg akan merubah nilai selectedPayment
		setSelectedPayments((prev) => {
			const isSelected = prev.some((p) => p.id === item.id);
			return isSelected ? prev.filter((p) => p.id !== item.id) : [...prev, item];
		});
	};

	useEffect(() => {
		const total = selectedPayments.reduce((sum, item) => sum + item.value, 0);
		//  nah yg disini ada total dmn artinya nilai / value dari selectedPayment akan di reduce / digabungkan menjadi 1 array di dalam method reduce itu ada accumulator di slot pertama dan current di slot ke 2

		if (total > 2500000) {
			setError("Total tidak boleh lebih dari 2.500.000");
		} else {
			setError("");
			setFormData((prev) => ({ ...prev, balance: total }));
		}
	}, [selectedPayments]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		// nah yg ini kalo g salah namanya reconstruction function jadi ini untuk memberi 1 nilai untuk beberapa variable jadi daripada name e.target dan ketik ulang di value mending pakai cara ini

		if (name === "balance" && Number(value) > 2500000) {
			setFormData({ ...formData, balance: 2500000 });
			setError("Balance tidak boleh lebih dari 2.500.000");
			return;
		}
		// nah ini itu biasa sering dibuat seperti untuk efisiensi karena handleChange ini dibuat dinamis name === "balance" disini itu untuk menangkap atribut name yg ada di input , jadi cara baca nya jika nama = balance dan value nya lebih dari 2jt500 maka error

		setFormData({ ...formData, [name]: value }); // yg ini juga sama maksudnya misal [nama]:value [nisn]:value
		setError("");
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/payment-items/${id}`);
			await fetchPaymentItems();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Form title="Pendaftaran Murid Baru" onSubmit={(e) => e.preventDefault()} error={error} button={null}>
				<Button
					className="btn btn-error text-white rounded-lg mb-4"
					onClick={() => navigate("/dashboard/tata-usaha")}
					content="Back"
				/>

				{/* Nama */}
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Nama Lengkap</label>
					<input
						type="text"
						name="nama"
						value={formData.nama}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>

				{/* Kelas */}
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Kelas</label>
					<div className="grid grid-cols-3 gap-3 border rounded-md shadow-lg p-5">
						{classOptions.map((item) => (
							<CheckBox
								key={item.id}
								title={item.title}
								checked={selectedClass.some((p) => p.id === item.id)}
								onChange={() => handleCheckboxClass(item)}
							/>
						))}
					</div>
				</div>

				{/* NISN */}
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">NISN</label>
					<input
						type="text"
						name="nisn"
						value={formData.nisn}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>

				<Button type="button" className="btn btn-primary mb-3" content="Option" onClick={() => setIsModalOpen(true)} />

				{/* CheckList Pembayaran */}
				<div className="flex flex-wrap justify-start mb-4 p-5 gap-3 border rounded-md shadow-lg">
					{loading ? (
						<p className="text-gray-500">Memuat daftar pembayaran...</p>
					) : (
						paymentItems.map((item) => (
							<CheckBox
								key={item.id}
								title={item.title}
								value={item.value}
								checked={selectedPayments.some((p) => p.id === item.id)}
								onChange={() => handleCheckboxChange(item)}
							/>
						))
					)}
				</div>

				{/* Balance */}
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">
						Uang Daftar (Total: Rp {formData.balance.toLocaleString("id-ID")})
					</label>
					<input
						type="number"
						name="balance"
						value={formData.balance}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						readOnly
					/>
				</div>

				<Button className="btn btn-success p-2" content="Cetak dan Bayar" onClick={handleSubmitAndPrint} />
			</Form>

			{/* Modal Options */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-2xl">
						<Button
							onClick={() => setIsModalOpen(false)}
							className="btn btn-error text-white p-2 mb-4"
							content="Tutup"
						/>
						<h2 className="text-xl font-bold mb-4">Opsi Tambahan</h2>
						<Button
							onClick={() => setIsAddPaymentModalOpen(true)}
							className="btn btn-primary p-2 mb-4"
							content="Tambah Payment Item"
						/>
						<div className="overflow-x-auto">
							<table className="table w-full">
								<thead>
									<tr>
										<th>#</th>
										<th>Judul</th>
										<th>Nominal</th>
										<th>Aksi</th>
									</tr>
								</thead>
								<tbody>
									{paymentItems.map((item, index) => (
										<tr key={item.id}>
											<td>{index + 1}</td>
											<td>{item.title}</td>
											<td>Rp {item.value.toLocaleString("id-ID")}</td>
											<td>
												<div className="flex gap-2">
													<Button
														className="btn btn-primary p-2"
														content="Edit"
														onClick={() => {
															setIsEditPaymentOpen(true);
															setFormOption({ title: item.title, value: item.value });
															setEditId(item.id);
														}}
													/>
													<Button
														className="btn btn-error p-2 text-white"
														content="Delete"
														onClick={() => handleDelete(item.id)}
													/>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}

			{/* Modal Tambah Payment */}
			{isAddPaymentModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<Button
							onClick={() => setIsAddPaymentModalOpen(false)}
							className="btn btn-error text-white p-2 mb-4"
							content="Tutup"
						/>
						<h2 className="text-lg font-bold mb-4">Tambah Payment Item</h2>
						<div className="mb-4">
							<label className="block text-gray-700 mb-1">Judul Pembayaran</label>
							<input
								type="text"
								name="title"
								value={formOption.title}
								onChange={(e) => setFormOption({ ...formOption, [e.target.name]: e.target.value })}
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 mb-1">Nominal</label>
							<input
								type="number"
								name="value"
								value={formOption.value}
								onChange={(e) => setFormOption({ ...formOption, [e.target.name]: Number(e.target.value) })}
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>
						<Button
							className="btn btn-success p-2"
							content="Simpan"
							onClick={async () => {
								await addPaymentItems();
								setIsAddPaymentModalOpen(false);
							}}
						/>
					</div>
				</div>
			)}

			{/* Modal Edit Payment */}
			{isEditPaymentModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<Button
							onClick={() => setIsEditPaymentOpen(false)}
							className="btn btn-error text-white p-2 mb-4"
							content="Tutup"
						/>
						<h2 className="text-lg font-bold mb-4">Edit Payment Item</h2>
						<div className="mb-4">
							<label className="block text-gray-700 mb-1">Judul Pembayaran</label>
							<input
								type="text"
								name="title"
								value={formOption.title}
								onChange={(e) => setFormOption({ ...formOption, [e.target.name]: e.target.value })}
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 mb-1">Nominal</label>
							<input
								type="number"
								name="value"
								value={formOption.value}
								onChange={(e) => setFormOption({ ...formOption, [e.target.name]: Number(e.target.value) })}
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>
						<Button
							className="btn btn-success p-2"
							content="Simpan"
							onClick={async () => {
								try {
									await axios.patch(`http://localhost:8080/api/payment-items/edit/${editId}`, {
										title: formOption.title,
										value: formOption.value,
									});
									await fetchPaymentItems();
									setIsEditPaymentOpen(false);
									setFormOption({ title: "", value: 0 });
									setEditId(null);
								} catch (err) {
									console.log(err);
								}
							}}
						/>
					</div>
				</div>
			)}

			{/* Cetak */}
			<CetakPembayaran
				ref={contentRef}
				data={{
					nama: formData.nama,
					kelas: formData.kelas,
					nisn: formData.nisn,
					pembayaran: selectedPayments,
					balance: formData.balance,
				}}
			/>
		</>
	);
};

export default PendaftaranMurid;
