import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const PembayaranContext = createContext();

export const PembayaranProvider = ({ children }) => {
	const [bayar, setBayar] = useState([]); // State untuk data pembayaran per siswa
	const [history, setHistory] = useState([]); // State untuk semua history pembayaran
	const [currentSiswa, setCurrentSiswa] = useState(null); // State untuk data siswa yang sedang dilihat
	const [isLoading, setIsLoading] = useState(false); // State untuk loading indicator
	const [error, setError] = useState(null); // State untuk error handling

	const { token } = useAuth();

	// Fungsi untuk mengambil semua history pembayaran
	const allHistoryPembayaran = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await axios.get("http://localhost:8080/api/spp", {
				headers: { Authorization: `Bearer ${token}` },
			});
			setHistory(res.data);
			return res.data;
		} catch (error) {
			console.error("Gagal mengambil riwayat pembayaran", error);
			setError("Gagal memuat data history pembayaran");
			throw error;
		} finally {
			setIsLoading(false);
		}
	}, [token]);

	// Fungsi untuk mengambil history pembayaran per siswa + data siswanya
	const fetchHistoryBySiswaId = useCallback(
		async (siswaId) => {
			setIsLoading(true);
			setError(null);
			try {
				// Ambil data siswa terlebih dahulu
				const resSiswa = await axios.get(`http://localhost:8080/api/siswa/${siswaId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setCurrentSiswa(resSiswa.data);

				// Ambil history pembayaran siswa
				const resHistory = await axios.get(`http://localhost:8080/api/spp/siswa/${siswaId}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setBayar(resHistory.data);

				return {
					siswa: resSiswa.data,
					history: resHistory.data,
				};
			} catch (error) {
				console.error("Gagal mengambil data history siswa", error);
				setError("Gagal memuat data siswa atau history pembayaran");
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[token]
	);

	// Fungsi untuk mengambil riwayat pembayaran per siswa dan tahun tertentu
	const fetchRiwayatPembayaran = useCallback(
		async (siswaId, tahun) => {
			setIsLoading(true);
			setError(null);
			try {
				const res = await axios.get(`http://localhost:8080/api/spp/siswa/${siswaId}/tahun/${tahun}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setBayar(res.data);
				return res.data;
			} catch (error) {
				console.error("Gagal mengambil riwayat pembayaran", error);
				setError("Gagal memuat riwayat pembayaran");
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[token]
	);

	// Fungsi untuk melakukan pembayaran SPP
	const pembayaranSpp = useCallback(
		async ({ id, bulan, tahun, jumlah }) => {
			setIsLoading(true);
			setError(null);
			try {
				const res = await axios.patch(
					`http://localhost:8080/api/spp/siswa/${id}/bayar/${bulan}`,
					{ bulan, tahun, jumlah },
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				const pembayaranBaru = res.data;

				// Update state bayar
				setBayar((prev) => {
					const sudahAda = prev.some((b) => b.id === pembayaranBaru.id);
					if (sudahAda) {
						return prev.map((b) => (b.id === pembayaranBaru.id ? pembayaranBaru : b));
					} else {
						return [...prev, pembayaranBaru];
					}
				});

				// Refresh data history
				await allHistoryPembayaran();

				return pembayaranBaru;
			} catch (error) {
				console.error("Pembayaran gagal", error);
				setError("Gagal melakukan pembayaran");
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[token, allHistoryPembayaran]
	);

	// Load semua history saat pertama kali
	useEffect(() => {
		allHistoryPembayaran();
	}, [allHistoryPembayaran]);

	return (
		<PembayaranContext.Provider
			value={{
				bayar,
				history,
				currentSiswa,
				isLoading,
				error,
				allHistoryPembayaran,
				fetchHistoryBySiswaId,
				fetchRiwayatPembayaran,
				pembayaranSpp,
			}}>
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
