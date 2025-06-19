import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SuperAdminContext = createContext();

export const SuperAdminProvider = ({ children }) => {
	const navigate = useNavigate();
	const { token, id: userId, logout } = useAuth();
	const [superAdmin, setSuperAdmin] = useState([]);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		city: "",
		country: "",
		email: "",
		phoneNumber: "",
		password: "",
	});

	const fetchDataSuperAdmin = useCallback(async () => {
		try {
			const res = await axios.get("http://localhost:8080/api/superadmin", {
				headers: { Authorization: `Bearer ${token}` },
			});
			setSuperAdmin(res.data);
		} catch (error) {
			setError("gagal mengambil data super admin");
			console.log(`error pada fetch data super admin ${error}`);
		}
	}, [token]);

	const createSuperAdmin = async () => {
		try {
			const res = await axios.post("http://localhost:8080/api/superadmin", formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setSuperAdmin((prev) => [...prev, res.data]);
		} catch (error) {
			setError("gagal membuat super admin");
			console.log(`gagal dalam membuat super admin ${error}`);
		}
	};

	const editSuperAdmin = async (id) => {
		try {
			const res = await axios.patch(`http://localhost:8080/api/superadmin/edit/${id}`, formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setSuperAdmin((prev) => prev.map((item) => (item.id === res.data.id ? res.data : item)));
		} catch (error) {
			setError("gagal edit super admin");
			console.log(`gagal dalam edit super admin ${error}`);
		}
	};

	const deleteSuperAdmin = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/superadmin/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setSuperAdmin((prev) => prev.filter((item) => item.id !== id));

			if (parseInt(userId) === id) {
				logout();
				navigate("/resign");
			}
		} catch (error) {
			setError("gagal delete super admin");
			console.log(`gagal dalam delete super admin ${error}`);
		}
	};

	useEffect(() => {
		fetchDataSuperAdmin();
	}, [fetchDataSuperAdmin]);

	return (
		<SuperAdminContext.Provider
			value={{
				superAdmin,
				error,
				formData,
				setFormData,
				fetchDataSuperAdmin,
				createSuperAdmin,
				editSuperAdmin,
				deleteSuperAdmin,
			}}>
			{children}
		</SuperAdminContext.Provider>
	);
};

export const useSuperAdmin = () => {
	const context = useContext(SuperAdminContext);
	if (!context) {
		throw new Error("useSuperAdmin must be used within a SuperAdminProvider");
	}
	return context;
};
