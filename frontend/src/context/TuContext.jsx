import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const TuContext = createContext();

export const TuProvider = ({ children }) => {
	const { token, logout, id: userId } = useAuth();
	const [tataUsaha, setTataUsaha] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		email: "",
		phoneNumber: "",
		password: "",
	});
	const navigate = useNavigate();
	const fetchDataTu = useCallback(async () => {
		try {
			const res = await axios.get("http://localhost:8080/api/tata-usaha", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setTataUsaha(res.data);
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	}, [token]);

	const tambahTu = async () => {
		try {
			const res = await axios.post(
				"http://localhost:8080/api/tata-usaha",
				{
					name: formData.name,
					address: formData.address,
					email: formData.email,
					phoneNumber: formData.phoneNumber,
					password: formData.password,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setTataUsaha((prev) => [...prev, res.data]); // refresh data setelah tambah
		} catch (error) {
			console.error(error);
			throw error;
		}
	};
	const editTu = async (id) => {
		try {
			await axios.patch(`http://localhost:8080/api/tata-usaha/edit/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setTataUsaha((prev) => prev.map((item) => (item.id === id ? { ...item, ...formData } : item)));
		} catch (error) {
			console.error(error);
		}
	};

	const hapusTu = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/tata-usaha/${id}`);
			await fetchDataTu();

			setTataUsaha((prev) => prev.filter((item) => item.id !== id));

			if (parseInt(userId) === id) {
				logout();
				navigate("/resign");
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchDataTu();
	}, [fetchDataTu]);

	return <TuContext.Provider value={{ tataUsaha, tambahTu, hapusTu, fetchDataTu, setFormData, formData, editTu }}>{children}</TuContext.Provider>;
};

export const useTu = () => useContext(TuContext);
