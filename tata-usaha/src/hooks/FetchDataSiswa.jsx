import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchDataSiswa = () => {
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Menggunakan useCallback agar fungsi tidak dibuat ulang setiap render
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8080/api/siswa");
      setSiswa(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal mengambil data siswa");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data saat komponen mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    siswa,
    loading,
    error,
    fetchData, // Mengembalikan fungsi fetchData, bukan useFetch
  };
};

export default useFetchDataSiswa;
