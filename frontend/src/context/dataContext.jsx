import { createContext, useContext, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [pemasukan, setPemasukan] = useState(null);

	const postPredict = async (jumlah) => {
		// Terima parameter jumlah
		try {
			const res = await axios.post("http://localhost:5000/api/predict", {
				jumlah: Number(jumlah),
			});
			setPemasukan(res.data.prediksi_pemasukan);
			return res.data; // Return data untuk handling di component
		} catch (error) {
			console.error(`Error saat prediksi: ${error}`);
			throw error;
		}
	};

	return <DataContext.Provider value={{ pemasukan, postPredict }}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
