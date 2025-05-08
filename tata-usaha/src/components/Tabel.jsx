import axios from "axios";
import { useState } from "react";

const Tabel = ({ onFetch, onRefresh }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/siswa/${id}`);
    onRefresh();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const filteredSiswa = onFetch.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.kelas.toLowerCase().includes(search.toLowerCase()) ||
      item.nisn.toLowerCase().includes(search.toLowerCase())
  );

  const siswaPerPage = 25;

  const indexOfLast = currentPage * siswaPerPage;
  const indexOfFirst = indexOfLast - siswaPerPage;
  const currentSiswa = filteredSiswa.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredSiswa.length / siswaPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="flex-grow container mt-4 mx-auto">
      <div class="mb-4">
        <input
          type="text"
          placeholder="cari siswa , kelas , nisn ..."
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nomor</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>NISN</th>
              <th>aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentSiswa.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.nama}</td>
                <td>{item.kelas}</td>
                <td>{item.nisn}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDelete(item.id)}
                  >
                    hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="flex justify-center  gap-2 mb-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Tabel;
