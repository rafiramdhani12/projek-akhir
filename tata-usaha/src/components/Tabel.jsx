import { useState } from "react";

const Tabel = ({ headers = [], data = [], searchKeys = [], renderRow = () => [] }) => {
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

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

	const itemsPerPage = 25;
	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
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
