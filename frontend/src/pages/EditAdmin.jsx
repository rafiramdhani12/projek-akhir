import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import Form from "../components/Form";
import Button from "../components/Button";

const EditAdmin = () => {
	const { id } = useParams();
	const { admin, formData, setFormData, editAdmin, error } = useAdmin();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const dataAmin = admin.find((s) => s.id === parseInt(id));

	useEffect(() => {
		if (dataAmin) {
			setFormData({
				name: dataAmin.name,
				address: dataAmin.address,
				city: dataAmin.city,
				country: dataAmin.country,
			});
		}
	}, [dataAmin]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		navigate("/dashboard/superadmin");
		setIsLoading(true);
		try {
			await editAdmin(id);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Form title={"edit admin"} button={null} error={error}>
				<Button className="error mb-4" onClick={() => navigate("/dashboard/superadmin")} content="Back" />
				{[
					{ label: "Nama", name: "name" },
					{ label: "Password", name: "password", type: "password" },
					{ label: "Alamat", name: "address" },
					{ label: "Kota", name: "city" },
					{ label: "Negara", name: "country" },
				].map(({ label, name, type = "text" }) => (
					<div key={name}>
						<label className="block text-gray-600 font-medium">{label}</label>
						<input type={type} name={name} value={formData[name]} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
					</div>
				))}
				<Button className="success mt-4" onClick={handleSubmit} content={isLoading ? "Loading..." : "Simpan"} />
				{error && <p>{error}</p>}
			</Form>
		</>
	);
};

export default EditAdmin;
