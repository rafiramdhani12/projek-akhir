import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import Button from "../components/Button";

const TambahAdmin = () => {
	const navigate = useNavigate();
	const { formData, setFormData, createAdmin, error } = useAdmin();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createAdmin();
		navigate("/dashboard/superadmin");
	};

	return (
		<>
			<Form title={"tambah admin"} onSubmit={(e) => e.preventDefault()} button={null} error={error}>
				<Button className="error mb-4" onClick={() => navigate("/dashboard/superadmin")} content="Back" />
				{[
					{ label: "Nama", name: "name" },
					{ label: "Password", name: "password", type: "password" },
					{ label: "Alamat", name: "address" },
					{ label: "Email", name: "email" },
					{ label: "Phone number", name: "phoneNumber" },
				].map(({ label, name, type = "text" }) => (
					<div key={name}>
						<label className="block text-gray-600 font-medium">{label}</label>
						<input
							type={type}
							name={name}
							value={formData[name]}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-md"
							placeholder={`masukkan ${label.toLowerCase()}`}
						/>
					</div>
				))}
				<Button className="success mt-4" onClick={handleSubmit} content="Tambah" />
			</Form>
		</>
	);
};

export default TambahAdmin;
