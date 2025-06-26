import { NavLink, useNavigate } from "react-router-dom";
import { useSiswa } from "../context/SiswaContext";
import { useState } from "react";
import Button from "../components/Button";

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
	// jika selectedClass value nya all maka akan merender semua siswa jika tidak maka hanya yg di filter saja yg di render

	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/dashboard/tata-usaha");
	};

	return (
		<>
			<div className="overflow-x-auto ml-5">
				<div className="flex justify-end mt-5">
					<select className="select select-bordered" value={selectedClass} onChange={handleChange}>
						<option value="all">Semua Kelas</option>
						{kelas.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className="mb-2 ">
					<Button className={"btn btn-error text-white "} content={"back"} onClick={handleBack} />
				</div>
				<div className="mb-2 ">
					<NavLink to={`/dashboard/tata-usaha/list-history-pembayaran`} className={"btn btn-success text-white"}>
						history pembayaran
					</NavLink>
				</div>

				<table className="table">
					<thead>
						<tr>
							<th>no</th>
							<th>NISN</th>
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
									<NavLink to={`/dashboard/tata-usaha/pembayaran/${item.id}`} className={"btn btn-success text-white"}>
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
