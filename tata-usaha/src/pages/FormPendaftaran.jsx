import axios from "axios";
import React, { useState } from "react";

const FormPendaftaran = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    nisn: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/siswa", formData);
      onSuccess(); //  panggil ulang fetch data di app
      setFormData({ nama: "", kelas: "", nisn: "" }); //rest form
    } catch (error) {
      console.error("gagal menambahkan siswa : ", error);
    }
  };

  return (
    <>
      <div className="flex justify-center min-h-screen text-center">
        <form onSubmit={handleSubmit} className="space-y-4  p-4">
          <input
            type="text"
            placeholder="Masukkan nama"
            name="nama"
            className="input input-bordered w-full max-w-xs"
            value={formData.nama}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="kelas"
            name="kelas"
            className="input input-bordered w-full max-w-xs"
            value={formData.kelas}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="nisn"
            name="nisn"
            className="input input-bordered w-full max-w-xs"
            value={formData.nisn}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Tambah siswa
          </button>
        </form>
      </div>
    </>
  );
};

export default FormPendaftaran;
