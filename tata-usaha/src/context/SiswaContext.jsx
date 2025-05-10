import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SiswaContext = createContext();

export const SiswaProvider = ({ children }) => {
	const [siswa, setSiswa] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const fetcDataSiswa = useCallback(async () => {
		try {
			setLoading(true);
			const res = await axios.get("http://localhost:8080/api/siswa", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			setSiswa(res.data);
		} catch (err) {
			setError("gagal mengambil data siswa");
			console.error(err);
		} finally {
			setLoading(false);
		}
	}, []);

	const tambahSiswa = async (formData) => {
		try {
			const res = await axios.post("http://localhost:8080/api/siswa", formData);
			setSiswa((prev) => [...prev, res.data]); // refresh data setelah tambah
			navigate("/dashboard");
		} catch (err) {
			console.error(`gagal menambahkan siswa : ${err}`);
			throw err;
		}
	};

	// fetch data pada saat pertama kali load
	useEffect(() => {
		fetcDataSiswa();
	}, [fetcDataSiswa]);

	return (
		<SiswaContext.Provider value={{ siswa, tambahSiswa, loading, error, fetcDataSiswa }}>
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
