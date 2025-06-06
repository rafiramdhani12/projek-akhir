import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useSiswa } from "./SiswaContext";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

const UtilContext = createContext();

export const UtilProvider = ({ children }) => {
	const { fetcDataSiswa } = useSiswa();
	const {token , role} = useAuth();
	const [paymentItems,setPaymentItems] = useState([])
	const [formOption , setFormOption] = useState({title:"" , value: 0})
	const [loading , setLoading] = useState(true)

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

	const renderAction = (item) => {
		if(role === "tata-usaha"){
			return(
		<>
			{item.balance < 2500000 && (
				<NavLink to={`/dashboard/admin/pelunasan/${item.id}`} className="btn btn-success btn-sm text-white mr-2">
					Pelunasan
				</NavLink>
			)}
			
		</>
			)
		}if(role === "admin"){
			return(
		<>
			{item.balance < 2500000 && (
				<NavLink to={`/dashboard/admin/pelunasan/${item.id}`} className="btn btn-success btn-sm text-white mr-2">
					edit
				</NavLink>
			)}
			<button onClick={() => handleDelete(item.id)} className="btn btn-error btn-sm text-white">
				Hapus Murid
			</button>
		</>
			)
		}
		return null
	};

	return <UtilContext.Provider value={{ rupiah, renderStatus, renderAction , paymentItems,loading,addPaymentItems , formOption , setFormOption , fetchPaymentItems}}>{children}</UtilContext.Provider>;
};

export const useUtil = () => useContext(UtilContext);
