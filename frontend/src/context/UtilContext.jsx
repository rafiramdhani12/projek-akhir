import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSiswa } from "./SiswaContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useReactToPrint } from "react-to-print";
import { useAdmin } from "./AdminContext";

const UtilContext = createContext();

export const UtilProvider = ({ children }) => {
	const { tambahSiswa } = useSiswa();
	const { fetchDataSiswa } = useSiswa();
	const { token, role, id: userId } = useAuth();
	const [paymentItems, setPaymentItems] = useState([]);
	const [formOption, setFormOption] = useState({ title: "", value: 0 });
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({ nama: "", kelas: "", nisn: "", balance: 0 });
	const [selectedClass, setSelectedClass] = useState([]);
	const [error, setError] = useState("");
	const [selectedPayments, setSelectedPayments] = useState([]);
	const { fetchDataAdmin } = useAdmin();
	const navigate = useNavigate();

	const contentRef = useRef();
	const printBill = useReactToPrint({ contentRef });

	const fetchPaymentItems = async () => {
		try {
			const res = await axios.get("http://localhost:8080/api/payment-items");
			setPaymentItems(res.data);
		} catch (error) {
			console.error("Gagal mengambil data payment items:", error);
		} finally {
			setLoading(false);
		}
	};

	const addPaymentItems = async () => {
		try {
			await axios.post(
				"http://localhost:8080/api/payment-items",
				{ title: formOption.title, value: formOption.value },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setFormOption({ title: "", value: 0 });
			fetchPaymentItems();
		} catch (error) {
			console.log("Gagal menambah item pembayaran:", error);
		}
	};

	const editPaymentItems = async (id) => {
		try {
			await axios.patch(
				`http://localhost:8080/api/payment-items/edit/${id}`,
				{ title: formOption.title, value: formOption.value },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
		} catch (error) {
			console.error("Gagal mengedit item pembayaran:", error);
		}
	};

	useEffect(() => {
		fetchPaymentItems();
	}, []);

	const rupiah = (value) =>
		new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(value);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/siswa/${id}`);
			fetchDataSiswa();
		} catch (err) {
			console.error("Gagal menghapus data", err);
		}
	};

	const handleDeleteAdmin = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/admin/${id}`);
			fetchDataAdmin();
		} catch (error) {
			console.error(`Gagal menghapus data ${error}`);
		}
	};

	const renderStatus = (balance) =>
		balance >= 2500000 ? (
			<div className="badge badge-success text-white">Lunas</div>
		) : (
			<div className="badge badge-error text-white">Belum Lunas</div>
		);

	const renderAction = (item) => {
		if (role === "tata-usaha") {
			return (
				<>
					{item.balance < 2500000 && (
						<NavLink to={`/dashboard/tata-usaha/pelunasan/${item.id}`} className="btn btn-success btn-sm text-white mr-2">
							Pelunasan
						</NavLink>
					)}
				</>
			);
		}
		if (role === "admin") {
			return (
				<>
					<NavLink to={`/dashboard/admin/edit-siswa/${item.id}`} className="btn btn-success btn-sm text-white mr-2">
						edit
					</NavLink>
					<button onClick={() => handleDelete(item.id)} className="btn btn-error btn-sm text-white">
						Hapus Murid
					</button>
				</>
			);
		}
		if (role === "superadmin") {
			return (
				<div>
					<NavLink to={`/dashboard/superadmin/edit-super-admin/${item.id}`} className="btn btn-success btn-sm text-white mr-2">
						edit
					</NavLink>

					{parseInt(userId) === item.id && (
						<button onClick={() => navigate(`/ketentuan-resign/${item.id}`)} className="btn btn-error btn-sm text-white">
							resign
						</button>
					)}
				</div>
			);
		}
		return null;
	};

	const handleSubmit = async () => {
		if (formData.balance > 2500000) {
			setError("Balance tidak boleh lebih dari 2.500.000");
			return;
		}

		console.log("Submit data:", formData);
		console.log("Selected payments:", selectedPayments);

		try {
			await tambahSiswa(formData);
			setFormData({ nama: "", kelas: "", nisn: "", balance: 0 });
			setSelectedPayments([]);
			setSelectedClass([]);
		} catch (err) {
			alert(`Gagal menambahkan siswa: ${err}`);
		}
	};

	const handleSubmitAndPrint = async () => {
		await handleSubmit();
		printBill();
	};

	return (
		<UtilContext.Provider
			value={{
				rupiah,
				renderStatus,
				renderAction,
				paymentItems,
				loading,
				addPaymentItems,
				formOption,
				setFormOption,
				fetchPaymentItems,
				handleSubmitAndPrint,
				selectedClass,
				error,
				contentRef,
				printBill,
				formData,
				setFormData,
				setError,
				selectedPayments,
				setSelectedPayments,
				setSelectedClass,
				editPaymentItems,
				handleDeleteAdmin,
			}}>
			{children}
		</UtilContext.Provider>
	);
};

export const useUtil = () => useContext(UtilContext);
