import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSiswa } from "../context/SiswaContext";
import Form from "../components/Form";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const PendaftaranMurid = () => {
  const { tambahSiswa } = useSiswa();
  const { token } = useAuth();

  const [formData, setFormData] = useState({ nama: "", kelas: "", nisn: "", balance: 0 });
  const [formOption, setFormOption] = useState({ title: "", value: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentItems, setPaymentItems] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);

  const classOptions = [
    { id: 1, title: "10 IPA 1" },
    { id: 2, title: "10 IPA 2" },
    { id: 3, title: "10 IPA 3" },
    { id: 4, title: "10 IPA 4" },
    { id: 5, title: "10 IPS 1" },
    { id: 6, title: "10 IPS 2" },
    { id: 7, title: "10 IPS 3" },
    { id: 8, title: "10 IPS 4" },
  ];

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

  const handleCheckboxClass = (item) => {
    setSelectedClass((prev) => {
      const isSelected = prev.some((p) => p.id === item.id);
      const updated = isSelected ? prev.filter((p) => p.id !== item.id) : [...prev, item];

      setFormData((prevForm) => ({
        ...prevForm,
        kelas: updated.map((k) => k.title).join(", "),
      }));

      return updated;
    });
  };

  const handleCheckboxChange = (item) => {
    setSelectedPayments((prev) => {
      const isSelected = prev.some((p) => p.id === item.id);
      return isSelected ? prev.filter((p) => p.id !== item.id) : [...prev, item];
    });
  };

  useEffect(() => {
    const total = selectedPayments.reduce((sum, item) => sum + item.value, 0);
    if (total > 2500000) {
      setError("Total tidak boleh lebih dari 2.500.000");
    } else {
      setError("");
      setFormData((prev) => ({ ...prev, balance: total }));
    }
  }, [selectedPayments]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "balance" && Number(value) > 2500000) {
      setFormData({ ...formData, balance: 2500000 });
      setError("Balance tidak boleh lebih dari 2.500.000");
      return;
    }

    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.balance > 2500000) {
      setError("Balance tidak boleh lebih dari 2.500.000");
      return;
    }
    try {
      await tambahSiswa(formData);
      setFormData({ nama: "", kelas: "", nisn: "", balance: 0 });
      setSelectedPayments([]);
      setSelectedClass([]);
    } catch (err) {
      alert(`Gagal menambahkan siswa: ${err}`);
    }
  };

  const handleDelete = async (id) =>{
	try{
		await axios.delete(`http://localhost:8080/api/payment-items/${id}`)
		await fetchPaymentItems()
	}catch(err){
		console.log(err)
	}
  }

  return (
    <>
      <Form title="Pendaftaran Murid Baru" onSubmit={handleSubmit} error={error} button="Daftar">
        <Button className="btn btn-error text-white rounded-lg mb-4" onClick={() => window.history.back()} content="Back" />

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nama Lengkap</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Kelas</label>
          <div className="grid grid-cols-3 gap-3 border rounded-md shadow-lg p-5">
            {classOptions.map((item) => (
              <CheckBox
                key={item.id}
                title={item.title}
                checked={selectedClass.some((p) => p.id === item.id)}
                onChange={() => handleCheckboxClass(item)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">NISN</label>
          <input
            type="text"
            name="nisn"
            value={formData.nisn}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <Button type="button" className="btn btn-primary mb-3" content="Option" onClick={() => setIsModalOpen(true)} />

        <div className="flex flex-wrap justify-start mb-4 p-5 gap-3 border rounded-md shadow-lg">
          {loading ? (
            <p className="text-gray-500">Memuat daftar pembayaran...</p>
          ) : (
            paymentItems.map((item) => (
              <CheckBox
                key={item.id}
                title={item.title}
                value={item.value}
                checked={selectedPayments.some((p) => p.id === item.id)}
                onChange={() => handleCheckboxChange(item)}
              />
            ))
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Uang Daftar (Total: Rp {formData.balance.toLocaleString("id-ID")})</label>
          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            readOnly
            min={0}
            max={2500000}
          />
        </div>
      </Form>

      {/* Modal Utama */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <Button onClick={() => setIsModalOpen(false)} className="btn btn-error text-white p-2 mb-4" content="Tutup" />
            <h2 className="text-xl font-bold mb-4">Opsi Tambahan</h2>
            <Button onClick={() => setIsAddPaymentModalOpen(true)} className="btn btn-primary p-2 mb-4" content="Tambah Payment Item" />

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Judul</th>
                    <th>Nominal</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>Rp {item.value.toLocaleString("id-ID")}</td>
                      <td>
                        <div className="flex gap-2">
                          <Button className="btn btn-primary p-2" content="Edit" />
                          <Button className="btn btn-error p-2 text-white" content="Delete" onClick={() => handleDelete(item.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Payment */}
      {isAddPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <Button onClick={() => setIsAddPaymentModalOpen(false)} className="btn btn-error text-white p-2 mb-4" content="Tutup" />
            <h2 className="text-lg font-bold mb-4">Tambah Payment Item</h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Judul Pembayaran</label>
              <input
                type="text"
                name="title"
                value={formOption.title}
                onChange={(e) => setFormOption({ ...formOption, [e.target.name]: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Nominal</label>
              <input
                type="number"
                name="value"
                value={formOption.value}
                onChange={(e) => setFormOption({ ...formOption, [e.target.name]: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <Button
              className="btn btn-success p-2"
              content="Simpan"
              onClick={async () => {
                await addPaymentItems();
                setIsAddPaymentModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PendaftaranMurid;
