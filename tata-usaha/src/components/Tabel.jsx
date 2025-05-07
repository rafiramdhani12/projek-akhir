import axios from "axios";

const Tabel = ({ onFetch, onRefresh }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/siswa/${id}`);
    onRefresh();
  };

  return (
    <main className="flex-grow container mt-4 mx-auto">
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
            {onFetch.map((item, index) => (
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
      </div>
    </main>
  );
};

export default Tabel;
