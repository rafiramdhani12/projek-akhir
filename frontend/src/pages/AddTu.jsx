import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useTu } from "../context/TuContext";
import Button from "../components/Button";

const AddTu = () => {
	const { formData, setFormData, tambahTu } = useTu();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await tambahTu();
			navigate("/dashboard/admin/daftar-tu");
		} catch (error) {
			console.error("Gagal menambah TU:", error);
		}
	};

	return (
		<Form title="Tambah TU" button={null} className={"success"}>
			<Button className={"error mb-2"} onClick={() => navigate("/dashboard/admin/daftar-tu")} content={"back"} />

			{[
				{ label: "Nama", name: "name" },
				{ label: "Alamat", name: "address" },
				{ label: "Kota", name: "city" },
				{ label: "Negara", name: "country" },
				{ label: "Password", name: "password" },
			].map(({ label, name, type = "text" }) => (
				<div key={name}>
					<label className="block text-gray-600 font-medium">{label}</label>
					<input
						type={type}
						name={name}
						value={formData[name]}
						onChange={handleChange}
						className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
						placeholder={`Masukkan ${label.toLowerCase()}`}
						required
					/>
				</div>
			))}
			<Button className={"success mt-4"} onClick={handleSubmit} content={"Tambah TU"} />
		</Form>
	);
};

export default AddTu;
