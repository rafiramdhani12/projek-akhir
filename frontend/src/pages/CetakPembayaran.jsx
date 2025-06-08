// components/CetakPembayaran.jsx
import React, { forwardRef } from "react";
import { useAuth } from "../context/AuthContext";

const CetakPembayaran = forwardRef(({ data }, ref) => {

  const {name} = useAuth()

  return (
    <div ref={ref} className="p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">SMA JIHAD KOTA BEKASI</h1>
        <p>Jl. Contoh No. 123, Bekasi</p>
        <p>Telp: (021) 1234567</p>
      </div>
      
      <div className="border-b-2 border-black mb-4"></div>
      
      <h2 className="text-xl font-bold mb-2 text-center">BUKTI PEMBAYARAN</h2>
      
      <div className="mb-4">
        <p><strong>Nama:</strong> {data.nama}</p>
        <p><strong>Kelas:</strong> {data.kelas}</p>
        <p><strong>NISN:</strong> {data.nisn}</p>
        <p><strong>Tanggal:</strong> {new Date().toLocaleDateString()}</p>
      </div>
      
      <table className="w-full mb-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">No</th>
            <th className="border p-2">Item Pembayaran</th>
            <th className="border p-2">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {data.pembayaran.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">Rp {item.value.toLocaleString("id-ID")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="text-right font-bold">
        <p>TOTAL: Rp {data.balance.toLocaleString("id-ID")}</p>
      </div>
      
      <div className="mt-8 text-center">
        <p>Bekasi, {new Date().toLocaleDateString()}</p>
        <div className="mt-12">
          <p>(___________________)</p>
          <p>Tata usaha: {name}</p>
        </div>
      </div>
    </div>
  );
});

export default CetakPembayaran;