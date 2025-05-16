import axios from "axios";
import { createContext, useContext } from "react";
import { useSiswa } from "./SiswaContext";
import { NavLink } from "react-router-dom";

const UtilContext = createContext();

export const UtilProvider = ({ children }) => {
	const { fetcDataSiswa } = useSiswa();

	const rupiah = (value) =>
		new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(value);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/siswa/${id}`);
			await fetcDataSiswa();
		} catch (err) {
			console.error("Gagal menghapus data", err);
		}
	};

	const renderStatus = (balance) =>
		balance >= 2500000 ? (
			<div className="badge badge-success text-white">Lunas</div>
		) : (
			<div className="badge badge-error text-white">Belum Lunas</div>
		);

	const renderAction = (item) => (
		<>
			{item.balance < 2500000 && (
				<NavLink to={`/dashboard/admin/pelunasan/${item.id}`} className="btn btn-success btn-sm text-white mr-2">
					Pelunasan
				</NavLink>
			)}
			<button onClick={() => handleDelete(item.id)} className="btn btn-error btn-sm text-white">
				Hapus Murid
			</button>
		</>
	);

	return <UtilContext.Provider value={{ rupiah, renderStatus, renderAction }}>{children}</UtilContext.Provider>;
};

export const useUtil = () => useContext(UtilContext);
