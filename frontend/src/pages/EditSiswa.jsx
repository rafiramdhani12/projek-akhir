import { useEffect, useState } from 'react'
import Form from '../components/Form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSiswa } from '../context/SiswaContext';

const EditSiswa = () => {
const { id } = useParams();
  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    nisn: "",
  });

  const {siswa} = useSiswa()

  const siswaData = siswa.find((s) => s.id === parseInt(id))

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchSiswa = async () => {
    try {
        const res = await axios.get(`http://localhost:8080/api/siswa/${id}`)
        setFormData({
            nama:res.data.nama,
            kelas:res.data.kelas,
            nisn:res.data.nisn
        })
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(()=>{
    fetchSiswa()
  },[id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      await axios.patch(`http://localhost:8080/api/siswa/edit/${id}`, formData);
      navigate("/dashboard/admin")
    } catch (err) {
      setError("Gagal mengupdate data siswa.");
      console.error(`Error update: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form 
        title="Update Murid"
        onSubmit={handleSubmit}
        error={error} 
        button={isLoading ? "Memproses..." : "Update"}
        disabled={isLoading}
      >
    <h1 className='mt-3 font-bold'>{siswaData? siswaData.nama : "siswa tidak ditemukan"}</h1>
        <div className="mb-4">
          <label htmlFor="nama" className="block text-gray-700 mb-2">Nama Siswa</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="kelas" className="block text-gray-700 mb-2">Kelas Siswa</label>
          <input
            type="text"
            id="kelas"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nisn" className="block text-gray-700 mb-2">NISN Siswa</label>
          <input
            type="text"
            id="nisn"
            name="nisn"
            value={formData.nisn}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
            disabled={isLoading}
          />
        </div>
      </Form>
    </>
  );
};

export default EditSiswa;
