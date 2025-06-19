import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSuperAdmin } from "../context/SuperAdminContext";

export default function KetentuanResign() {
	const { id } = useParams();
	const { superAdmin, deleteSuperAdmin } = useSuperAdmin();

	const dataSuperAdmin = superAdmin.find((s) => s.id === parseInt(id));

	const [checked, setChecked] = useState(false);
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
				<h1 className="text-3xl font-bold text-gray-800 mb-4">Peringatan Resign : {dataSuperAdmin?.name}</h1>
				<p className="text-gray-600 leading-relaxed">Sebelum Anda melanjutkan proses resign, mohon baca dan pahami ketentuan berikut:</p>

				<ul className="text-left mt-6 list-disc list-inside text-gray-500 space-y-2">
					<li>
						Pengajuan resign harus dilakukan minimal <strong>7 hari</strong> sebelum tanggal keluar.
					</li>
					<li>Pastikan semua tugas, tanggung jawab, dan dokumen telah diselesaikan.</li>
					<li>Data Anda akan dinonaktifkan dan tidak dapat diakses kembali setelah resign.</li>
				</ul>

				<div className="mt-8">
					<div className="flex items-center">
						<input type="checkbox" id="checkbox" className="mr-2" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
						<label htmlFor="checkbox" className="text-gray-600">
							Saya telah membaca dan menyetujui ketentuan di atas.
						</label>
					</div>
				</div>

				<div className="mt-8">
					<button
						disabled={!checked}
						className={`px-6 py-3  rounded-full shadow ${
							checked ? "cursor-pointer text-white bg-blue-600" : "cursor-not-allowed bg-gray-300 text-gray-600"
						}`}
						title="Tombol akan aktif setelah menyetujui ketentuan"
						onClick={() => deleteSuperAdmin(dataSuperAdmin.id)}>
						Saya Mengerti, Ajukan Resign
					</button>
					<p className="text-sm text-gray-400 mt-2">*Tombol akan aktif setelah menyetujui semua ketentuan di atas.</p>
				</div>
				<div className="mt-8">
					<button
						onClick={() => window.history.back()}
						className={"px-6 py-3  rounded-full shadow bg-red-500 text-white"}
						title="Tombol akan aktif setelah menyetujui ketentuan">
						batal
					</button>
				</div>
			</motion.div>
		</div>
	);
}
