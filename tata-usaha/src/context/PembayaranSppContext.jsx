import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const PembayaranContext = createContext();

export const PembayaranProvider = ({ children }) => {
	const [bayar, setBayar] = useState([]);
	const [history, setHistory] = useState([]);

	const { token } = useAuth();

	const allHistoryPembayaran = useCallback(async () => {
		try {
			const res = await axios.get("http://localhost:8080/api/spp", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setHistory(res.data);
			return res.data;
		} catch (error) {
			console.error("Gagal mengambil riwayat pembayaran", error);
		}
	}, [token]);

	const fetchRiwayatPembayaran = async (siswaId, tahun) => {
		try {
			const res = await axios.get(`http://localhost:8080/api/spp/siswa/${siswaId}/tahun/${tahun}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setBayar(res.data);
		} catch (error) {
			console.error("Gagal mengambil riwayat pembayaran", error);
		}
	};

	const pembayaranSpp = async ({ id, bulan, tahun }) => {
		try {
			const res = await axios.patch(
				`http://localhost:8080/api/spp/siswa/${id}/bayar/${bulan}`,
				{ bulan, tahun },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const pembayaranBaru = res.data;

			// Jika belum ada, tambahkan ke list
			setBayar((prev) => {
				const sudahAda = prev.some((b) => b.id === pembayaranBaru.id);
				if (sudahAda) {
					return prev.map((b) => (b.id === pembayaranBaru.id ? pembayaranBaru : b));
				} else {
					return [...prev, pembayaranBaru];
				}
			});
		} catch (error) {
			console.error(`pembayaran gagal : ${error}`);
			throw error;
		}
	};

	useEffect(() => {
		allHistoryPembayaran();
	}, [allHistoryPembayaran]);

	return (
		<PembayaranContext.Provider value={{ history, bayar, pembayaranSpp, fetchRiwayatPembayaran, allHistoryPembayaran }}>
			{children}
		</PembayaranContext.Provider>
	);
};

export const usePembayaran = () => {
	const context = useContext(PembayaranContext);
	if (!context) {
		throw new Error("usePembayaran must be used within a PembayaranProvider");
	}
	return context;
};
