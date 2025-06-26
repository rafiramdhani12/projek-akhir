import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSuperAdmin } from "../context/SuperAdminContext";
import Form from "../components/Form";
import { Eye, EyeClosed } from "lucide-react";

const TambahSuperAdmin = () => {
	const navigate = useNavigate();
	const { formData, setFormData, createSuperAdmin, error } = useSuperAdmin();
	const [isShow, setIsShow] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createSuperAdmin();
		navigate("/dashboard/superadmin");
	};

	return (
		<Form title={"tambah super admin"} button={null} error={error} onSubmit={(e) => e.preventDefault()}>
			<Button className="error mb-4" onClick={() => navigate("/dashboard/superadmin")} content="Back" />
			{[
				{ label: "Nama", name: "name" },
				{ label: "Email", name: "email", type: "email" },
				{ label: "Password", name: "password", type: isShow === false ? "password" : "text", hasEye: true },
				{ label: "No. Telepon", name: "phoneNumber" },
				{ label: "Alamat", name: "address" },
			].map(({ label, name, type = "text", hasEye = false }) => (
				<div key={name}>
					<label className="block text-gray-600 font-medium">{label}</label>
					<div className="flex items-center gap-2">
						<input
							type={type}
							name={name}
							value={formData[name]}
							onChange={handleChange}
							className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
							placeholder={`Masukkan ${label.toLowerCase()}`}
						/>
						{hasEye && <Button content={isShow ? <EyeClosed /> : <Eye />} onClick={() => setIsShow(!isShow)} className={"success"} />}
					</div>
				</div>
			))}
			<Button content="Simpan" className="success mt-4" onClick={handleSubmit} />
		</Form>
	);
};

export default TambahSuperAdmin;
