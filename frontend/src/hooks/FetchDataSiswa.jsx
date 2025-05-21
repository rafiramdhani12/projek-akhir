// deprecated
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useFetchDataSiswa = () => {
	const [siswa, setSiswa] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Menggunakan useCallback agar fungsi tidak dibuat ulang setiap render
	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.get("http://localhost:8080/api/siswa", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			setSiswa(response.data);
		} catch (err) {
			console.error("Error fetching data:", err);
			setError("Gagal mengambil data siswa");
		} finally {
			setLoading(false);
		}
	}, []);

	// Fetch data saat komponen mount
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return {
		siswa,
		loading,
		error,
		fetchData, // Mengembalikan fungsi fetchData, bukan useFetch
	};
};

export const useFormSiswa = (onSuccess) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		nama: "",
		kelas: "",
		nisn: "",
	});
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:8080/api/siswa", formData);
			setFormData({ nama: "", kelas: "", nisn: "" });
			if (onSuccess) {
				onSuccess();
			}
			navigate("/");
		} catch (error) {
			console.error("gagal menambahkan siswa : ", error);
		}
	};

	return {
		formData,
		handleChange,
		handleSubmit,
	};
};
