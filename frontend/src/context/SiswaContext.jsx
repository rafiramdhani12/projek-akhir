import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const SiswaContext = createContext();

export const SiswaProvider = ({ children }) => {
	const { token } = useAuth();
	const [siswa, setSiswa] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const fetchDataSiswa = useCallback(async () => {
		try {
			setLoading(true);
			const res = await axios.get("http://localhost:8080/api/siswa", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setSiswa(res.data);
		} catch (err) {
			setError("gagal mengambil data siswa");
			console.error(err);
		} finally {
			setLoading(false);
		}
	}, [token]);

	const tambahSiswa = async (formData) => {
		try {
			const res = await axios.post("http://localhost:8080/api/siswa", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setSiswa((prev) => [...prev, res.data]); // refresh data setelah tambah
			navigate("/dashboard/tata-usaha");
		} catch (err) {
			console.error(`gagal menambahkan siswa : ${err}`);
			throw err;
		}
	};

	const pelunasan = async (formData) => {
		try {
			const res = await axios.patch(`http://localhost:8080/api/siswa/pelunasan/${formData.id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			// update data siswa yg ada di state, bukan menambah
			setSiswa((prev) => prev.map((siswa) => (siswa.id === formData.id ? res.data : siswa)));
			navigate("/dashboard/tata-usaha");
		} catch (error) {
			console.error(`gagal update siswa : ${error}`);
			throw error;
		}
	};

	// fetch data pada saat pertama kali load
	useEffect(() => {
		fetchDataSiswa();
	}, [fetchDataSiswa]);

	return (
		<SiswaContext.Provider value={{ siswa, tambahSiswa, loading, error, fetchDataSiswa, pelunasan }}>
			{children}
		</SiswaContext.Provider>
	);
};

export const useSiswa = () => {
	const context = useContext(SiswaContext);
	if (!context) {
		throw new Error("useSiswa must be used within a SiswaProvider");
	}
	return context;
};
