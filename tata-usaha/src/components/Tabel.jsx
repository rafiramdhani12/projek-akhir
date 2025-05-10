/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSiswa } from "../context/SiswaContext";

const Tabel = ({ onFetch, onRefresh }) => {
	const { siswa, loading, error, fetcDataSiswa } = useSiswa();

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/siswa/${id}`);
			await fetcDataSiswa(); // pastikan data di reset
		} catch (err) {
			console.error("gagal menghapus data", err);
		}
	};

	let status = "";

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const filteredSiswa = siswa.filter(
		(item) =>
			item.nama.toLowerCase().includes(search.toLowerCase()) ||
			item.kelas.toLowerCase().includes(search.toLowerCase()) ||
			item.nisn.toLowerCase().includes(search.toLowerCase())
	);

	const siswaPerPage = 25;

	const indexOfLast = currentPage * siswaPerPage;
	const indexOfFirst = indexOfLast - siswaPerPage;
	const currentSiswa = filteredSiswa.slice(indexOfFirst, indexOfLast);

	const totalPages = Math.ceil(filteredSiswa.length / siswaPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<main className="flex-grow container mt-4 mx-auto">
			<div class="mb-4">
				<input
					type="text"
					placeholder="cari siswa , kelas , nisn ..."
					className="input input-bordered w-full max-w-xs"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th>Nomor</th>
							<th>Nama</th>
							<th>Kelas</th>
							<th>NISN</th>
							<th>balance</th>
							<th>status</th>
							<th>aksi</th>
						</tr>
					</thead>
					<tbody>
						{currentSiswa.map((item, index) => (
							<tr key={index}>
								<th>{index + 1}</th>
								<td>{item.nama}</td>
								<td>{item.kelas}</td>
								<td>{item.nisn}</td>
								<td>{item.balance}</td>
								<td>
									{item.balance >= 2500000 ? (
										<h1 className="bg-green-500 text-white rounded-lg p-4 text-center font-bold">
											{(status = "Lunas")}
										</h1>
									) : (
										<h1 className="bg-red-500 text-white rounded-lg p-4 text-center font-bold">
											{(status = "blm lunas")}
										</h1>
									)}
								</td>
								<td>
									{item.balance >= 2500000 ? (
										<NavLink to={`/pelunasan/${item.id}`} className="btn btn-success text-white mr-2">
											pelunasan
										</NavLink>
									) : null}
									<button className="btn btn-error text-white" onClick={() => handleDelete(item.id)}>
										hapus
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div class="flex justify-center  gap-2 mb-2">
					{[...Array(totalPages)].map((_, i) => (
						<button
							key={i}
							onClick={() => paginate(i + 1)}
							className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}>
							{i + 1}
						</button>
					))}
				</div>
			</div>
		</main>
	);
};

export default Tabel;
