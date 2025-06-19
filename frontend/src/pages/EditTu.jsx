import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTu } from "../context/TuContext";
import Form from "../components/Form";
import Button from "../components/Button";

const EditTu = () => {
	const { id } = useParams();
	const { tataUsaha, editTu, formData, setFormData } = useTu();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const dataTu = tataUsaha.find((s) => s.id === parseInt(id));

	useEffect(() => {
		if (dataTu) {
			setFormData({
				name: dataTu.name,
				address: dataTu.address,
				city: dataTu.city,
				country: dataTu.country,
			});
		}
	}, [dataTu]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		navigate("/dashboard/admin/daftar-tu");
		setIsLoading(true);
		try {
			await editTu(id);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Form title={"Edit Tata Usaha"} button={null}>
				<Button className={"error mb-2"} onClick={() => navigate("/dashboard/admin/daftar-tu")} content={"back"} />
				<h1 className="mt-3 font-bold">{dataTu ? null : "Tata usaha tidak ditemukan"}</h1>
				{[
					{ label: "Nama", name: "name" },
					{ label: "Alamat", name: "address" },
					{ label: "Kota", name: "city" },
					{ label: "Negara", name: "country" },
				].map(({ label, name, type = "text" }) => (
					<div key={name}>
						<label className="block text-gray-700 mb-2">{label}</label>
						<input
							type={type}
							id={name}
							name={name}
							value={formData[name]}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-md"
							required
							disabled={isLoading}
						/>
					</div>
				))}
				<Button className={"success mt-4"} content={"simpan perubahan"} onClick={handleSubmit} />
			</Form>
		</>
	);
};

export default EditTu;
