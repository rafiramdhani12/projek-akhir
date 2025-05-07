import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DaftarMurid from "./pages/DaftarMurid";
import { Routes, Route } from "react-router-dom";
import FormPendaftaran from "./pages/FormPendaftaran";
import useFetchDataSiswa from "./hooks/FetchDataSiswa";

function App() {
  // Perbaikan: Pastikan nama property yang didestrukturisasi sesuai
  const { siswa, fetchData, loading } = useFetchDataSiswa();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Konten Utama */}
      <Routes>
        <Route
          path="/"
          element={
            // Perbaikan: Kirim fungsi fetchData sebagai onRefresh
            <DaftarMurid onFetch={siswa} onRefresh={fetchData} />
          }
        />
        <Route
          path="/pendaftaran-murid-baru"
          element={<FormPendaftaran onSuccess={fetchData} />}
        />
      </Routes>

      {/* Footer tetap di bawah */}
      <Footer />
    </div>
  );
}

export default App;
