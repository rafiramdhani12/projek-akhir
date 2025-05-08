import React from "react";

const FormPendaftaran = ({ handleSubmit, handleChange, formData }) => {
	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4">Pendaftaran Murid Baru</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="nama">
						Nama Lengkap
					</label>
					<input
						type="text"
						id="nama"
						name="nama"
						value={formData.nama}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="kelas">
						Kelas
					</label>
					<input
						type="text"
						id="kelas"
						name="kelas"
						value={formData.kelas}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="nisn">
						NISN
					</label>
					<input
						type="text"
						id="nisn"
						name="nisn"
						value={formData.nisn}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>

				<button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
					Daftar
				</button>
			</form>
		</div>
	);
};

export default FormPendaftaran;
