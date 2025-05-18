import { useState } from "react";

// * di component ini sengaja dibuat seperti ini yg artinya adalah reusable component yg dmn component nya bisa digunakan di manapun
const Tabel = ({ headers = [], data = [], searchKeys = [], renderRow = () => [] }) => {
	//* parameter diatas menampung props yg dmn akan di gunakan/diolah di component ini props ini menampung data yg dilempar dari depan dan diolah disini
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	// *filtered data mengambil value dari props data
	const filteredData = data.filter((item) =>
		searchKeys.some((key) => {
			// Handle nested properties (misal: "siswa.nama")
			const keys = key.split(".");
			let value = item;
			for (const k of keys) {
				value = value?.[k];
				if (value === undefined) break;
			}
			return value?.toString().toLowerCase().includes(search.toLowerCase());
		})
	);

	const handleChange = (e) => {
		setCurrentPage(1);
		setSearch(e.target.value);
		console.log(e.target.value);
	};

	// * ini untuk mengatur pagination dmn max dari jumlah per page ada di 25 item
	const itemsPerPage = 25;
	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;

	// * dan ini untuk  memfilter data yg ada kaitannya dengan variable yg ada diatas dari filteredData
	const currentData = filteredData.slice(indexOfFirst, indexOfLast);
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	return (
		<main className="flex-grow container mt-4 mx-auto">
			<div className="mb-4">
				<input
					type="text"
					placeholder="Cari..."
					className="input input-bordered w-full max-w-xs"
					value={search}
					onChange={handleChange}
				/>
			</div>

			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							{headers.map((h, idx) => (
								<th key={idx}>{h}</th>
							))}
						</tr>
					</thead>
					<tbody>{renderRow(currentData)}</tbody>
				</table>

				<div className="flex justify-center gap-2 mt-4">
					{[...Array(totalPages)].map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrentPage(i + 1)}
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
