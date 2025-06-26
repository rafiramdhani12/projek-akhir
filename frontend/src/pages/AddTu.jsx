import React, { useState } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useTu } from "../context/TuContext";
import Button from "../components/Button";
import { Eye, EyeClosed } from "lucide-react";

const AddTu = () => {
	const { formData, setFormData, tambahTu } = useTu();
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		try {
			await tambahTu();
			navigate("/dashboard/admin/daftar-tu");
		} catch (error) {
			console.error("Gagal menambah TU:", error);
		}
	};

	return (
		<Form title="Tambah TU" button={null} className={"success"} onSubmit={(e) => e.preventDefault()}>
			<Button className={"error mb-2"} onClick={() => navigate("/dashboard/admin/daftar-tu")} content={"back"} />

			{[
				{ label: "Nama", name: "name" },
				{ label: "Alamat", name: "address" },
				{ label: "Email", name: "email" },
				{ label: "Phone Number", name: "phoneNumber" },
				{ label: "Password", name: "password", type: isShow === false ? "password" : "text", hasEye: true },
			].map(({ label, name, type = "text", hasEye = false }) => (
				<div key={name}>
					<label className="block text-gray-600 font-medium">{label}</label>
					<div className="flex text-center gap-2">
						<input
							type={type}
							name={name}
							value={formData[name]}
							onChange={handleChange}
							className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
							placeholder={`Masukkan ${label.toLowerCase()}`}
						/>
						{hasEye && <Button content={isShow ? <EyeClosed /> : <Eye />} onClick={() => setIsShow(!isShow)} className={"success mt-1"} />}
					</div>
				</div>
			))}
			<Button className={"success mt-4"} onClick={handleSubmit} content={"Tambah TU"} />
		</Form>
	);
};

export default AddTu;
