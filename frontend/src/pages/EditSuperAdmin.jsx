import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuperAdmin } from "../context/SuperAdminContext";
import Form from "../components/Form";
import Button from "../components/Button";

const EditSuperAdmin = () => {
	const { id } = useParams();
	const { superAdmin, formData, setFormData, editSuperAdmin, error } = useSuperAdmin();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const dataSuperAdmin = superAdmin.find((s) => s.id === parseInt(id));

	useEffect(() => {
		if (dataSuperAdmin) {
			setFormData({
				name: dataSuperAdmin.name,
				address: dataSuperAdmin.address,
				email: dataSuperAdmin.email,
				phoneNumber: dataSuperAdmin.phoneNumber,
				password: dataSuperAdmin.password,
			});
		}
	}, [dataSuperAdmin]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		navigate("/dashboard/superadmin");
		setIsLoading(true);
		try {
			await editSuperAdmin(id);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	return (
		<>
			<Form title={"edit super admin"} button={null} error={error}>
				<Button className={"error mb-4"} content={"back"} onClick={() => navigate("/dashboard/superadmin")} />
				{[
					{ label: "Name", name: "name" },
					{ label: "Password", name: "password" },
					{ label: "Address", name: "address" },

					{ label: "Email", name: "email" },
					{ label: "Phone Number", name: "phoneNumber" },
				].map(({ label, name }) => (
					<div key={name}>
						<label className="block text-gray-600 font-medium">{label}</label>
						<input
							type="text"
							name={name}
							value={formData[name]}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md"
						/>
					</div>
				))}
				<Button className={"success mt-4"} content={isLoading ? "loading" : "simpan"} onClick={handleSubmit} />
			</Form>
		</>
	);
};

export default EditSuperAdmin;
