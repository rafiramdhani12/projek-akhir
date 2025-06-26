import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useSuperAdmin } from "../context/SuperAdminContext";
import { useAdmin } from "../context/AdminContext";
import { useTu } from "../context/TuContext";
import { useAuth } from "../context/AuthContext";

export default function KetentuanResign() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { superAdmin, deleteSuperAdmin } = useSuperAdmin();
	const { admin, deleteAdmin } = useAdmin();
	const { tataUsaha, hapusTu } = useTu();
	const { role } = useAuth();

	const dataSuperAdmin = superAdmin.find((s) => s.id === parseInt(id));
	const dataAdmin = admin.find((s) => s.id === parseInt(id));
	const dataTu = tataUsaha.find((s) => s.id === parseInt(id));

	const [checked, setChecked] = useState(false);

	// Handle jika data tidak ditemukan
	if (!dataSuperAdmin && !dataAdmin && !dataTu) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-red-500">Data tidak ditemukan.</p>
			</div>
		);
	}

	const handleResign = () => {
		// Gunakan role untuk menentukan fungsi penghapusan yang tepat
		if (role === "superAdmin") {
			deleteSuperAdmin(parseInt(id));
		} else if (role === "admin") {
			deleteAdmin(parseInt(id));
		} else if (role === "tata-usaha") {
			hapusTu(parseInt(id));
		}
	};

	const renderData = () => {
		if (role === "superAdmin") {
			return dataSuperAdmin?.name;
		} else if (role === "admin") {
			return dataAdmin?.name;
		} else if (role === "tata-usaha") {
			return dataTu?.name;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-slate-100 p-6 flex items-center justify-center">
			<motion.div
				className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 text-center"
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				<div className="flex justify-center mb-4 text-yellow-600">
					<AlertTriangle size={48} />
				</div>
				<h1 className="text-3xl font-bold text-gray-800 mb-4">
					Peringatan Resign: {role} {renderData()}
				</h1>
				<p className="text-gray-600 leading-relaxed">Sebelum Anda melanjutkan proses resign, mohon baca dan pahami ketentuan berikut:</p>

				<ul className="text-left mt-6 list-disc list-inside text-gray-500 space-y-2">
					<li>
						Pengajuan resign harus dilakukan minimal <strong>7 hari</strong> sebelum tanggal keluar.
					</li>
					<li>Pastikan semua tugas, tanggung jawab, dan dokumen telah diselesaikan.</li>
					<li>Data Anda akan dinonaktifkan dan tidak dapat diakses kembali setelah resign.</li>
				</ul>

				<div className="mt-8 flex items-center justify-center">
					<input type="checkbox" id="checkbox" className="mr-2" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
					<label htmlFor="checkbox" className="text-gray-600">
						Saya telah membaca dan menyetujui ketentuan di atas.
					</label>
				</div>

				<div className="mt-8 space-y-4">
					<button
						disabled={!checked}
						className={`px-6 py-3 rounded-full shadow transition-colors ${
							checked ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" : "bg-gray-300 text-gray-600 cursor-not-allowed"
						}`}
						onClick={handleResign}>
						Saya Mengerti, Ajukan Resign
					</button>
					<p className="text-sm text-gray-400">*Tombol akan aktif setelah menyetujui semua ketentuan.</p>

					<button
						onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
						className="px-6 py-3 rounded-full shadow bg-red-500 hover:bg-red-600 text-white transition-colors">
						Batal
					</button>
				</div>
			</motion.div>
		</div>
	);
}
