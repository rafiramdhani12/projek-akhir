import { NavLink } from "react-router-dom";
import { useSiswa } from "../context/SiswaContext";
import { useState } from "react";

const Spp = () => {
	const { siswa } = useSiswa();

	const [selectedClass, setSelectedClass] = useState("all");

	const handleChange = (e) => {
		setSelectedClass(e.target.value);
	};

	const kelas = [
		"10 ipa 1",
		"10 ipa 2",
		"10 ipa 3",
		"10 ipa 4",
		"10 ips 1",
		"10 ips 2",
		"10 ips 3",
		"10 ips 4",
		"11 ipa 1",
		"11 ipa 2",
		"11 ipa 3",
		"11 ipa 4",
		"11 ips 1",
		"11 ips 2",
		"11 ips 3",
		"11 ips 4",
		"12 ipa 1",
		"12 ipa 2",
		"12 ipa 3",
		"12 ipa 4",
		"12 ips 1",
		"12 ips 2",
		"12 ips 3",
		"12 ips 4",
	];

	const filteredSiswa = selectedClass === "all" ? siswa : siswa.filter((s) => s.kelas === selectedClass);

	return (
		<>
			<div className="overflow-x-auto">
				<div className="flex justify-end mt-5 mb-5">
					<select className="select select-bordered" value={selectedClass} onChange={handleChange}>
						<option value="all">Semua Kelas</option>
						{kelas.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<table className="table">
					<thead>
						<tr>
							<th>no</th>
							<th>Nama</th>
							<th>kelas</th>
							<th>aksi</th>
						</tr>
					</thead>
					<tbody>
						{filteredSiswa.map((item, i) => (
							<tr key={i}>
								<th>{i + 1}</th>
								<td>{item.nama}</td>
								<td>{item.kelas}</td>
								<td>
									<NavLink to={`/pembayaran/${item.id}`} className={"btn btn-success text-white"}>
										pembayaran
									</NavLink>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Spp;
