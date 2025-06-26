import { createContext, useCallback, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
	const { token } = useAuth();
	const [admin, setAdmin] = useState([]);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		city: "",
		country: "",
		password: "",
	});

	const navigate = useNavigate();
	const { id: userId, logout } = useAuth();

	const fetchDataAdmin = useCallback(async () => {
		try {
			const res = await axios.get("http://localhost:8080/api/admin", {
				headers: { Authorization: `Bearer ${token}` },
			});
			setAdmin(res.data);
		} catch (error) {
			setError("gagal mengambil data admin");
			console.log(`error pada fetch data admin ${error}`);
		}
	}, [token]);

	const createAdmin = async () => {
		try {
			const res = await axios.post("http://localhost:8080/api/admin", formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setAdmin((prev) => [...prev, res.data]);
		} catch (error) {
			setError("gagal membuat admin");
			console.error(`gagal dalam membuat admin ${error}`);
		}
	};

	const editAdmin = async (id) => {
		try {
			const res = await axios.patch(`http://localhost:8080/api/admin/edit/${id}`, formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setAdmin((prev) => prev.map((item) => (item.id === res.data.id ? res.data : item)));
		} catch (error) {
			setError("gagal edit admin");
			console.log(`gagal dalam edit admin ${error}`);
		}
	};

	const deleteAdmin = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/admin/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setAdmin((prev) => prev.filter((item) => item.id !== id));

			if (parseInt(userId) === id) {
				logout();
				navigate("/resign");
			}
		} catch (error) {
			setError("gagal delete admin");
			console.log(`gagal dalam delete admin ${error}`);
		}
	};

	return (
		<AdminContext.Provider value={{ admin, setAdmin, error, setError, formData, setFormData, fetchDataAdmin, createAdmin, editAdmin, deleteAdmin }}>
			{children}
		</AdminContext.Provider>
	);
};

export const useAdmin = () => {
	const context = useContext(AdminContext);
	if (!context) {
		throw new Error("useAdmin must be used within an AdminProvider");
	}
	return context;
};
