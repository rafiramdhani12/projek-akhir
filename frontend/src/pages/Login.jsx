import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import Form from "../components/Form";

const Login = () => {
 const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(`http://localhost:8080/api/${role}/login`, {
        name,
        password,
      }); // nah jadi disini memang ada incosistence dari penulisan ada yg memakai useState ({}) ada juga yg nulis nya 1 1 tapi disini menjelaskan jika function res ini mengiriman method post pada endpoint api yg tertuju dan mengirimkan value nama dan password nah dibagian role nya itu dibuat dinamis tapi set default nya adalah admin karena endopoint api nya itu ada 2 daripada render 2 kali mending dijadiin dinamis seperti ini

      console.log("Full response:", res); // Debugging
      console.log("Response data:", res.data); // Debugging

      const data = res.data;
      // nah jadi disetiap api itu memang sering ada .data itu artinyan untuk mengakases datanya jika nested bisa res.data.addres yg dmn addres misalnya ada country ada city dan juga bisa digunakan untuk mengakses langsung res.data.nama dan dmn nama ini tunggal dan pada kasus ini res.data mengambil semua data nya (kulit luar)

      // Validasi response minimum
      if (!data || !data.token) {
        throw new Error("Token tidak diterima dari server");
      }

      // Jika backend tidak mengirim name, gunakan input dari form
      const userName = data.name || name;
      
      // Jika backend tidak mengirim role, gunakan select dari form
      const userRole = data.role || role;

      // Simpan ke context
      login({
        name: userName,
        role: userRole,
        token: data.token,
      });

      // Redirect
      navigate(userRole === "admin" ? "/dashboard/admin" : "/dashboard/admin");

    } catch (err) {
      console.error("Error details:", {
        error: err,
        response: err.response,
      }); // Debugging lengkap
      
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat login";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form 
      title="Login" 
      onSubmit={handleLogin} 
      error={error} 
      button={isLoading ? "Memproses..." : "Login"}
      disabled={isLoading}
      className={"success"}
    >
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 mb-2">Login sebagai</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          disabled={isLoading}
        >
          <option value="admin">Admin</option>
          <option value="tata-usaha">Tata Usaha</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">Nama Pengguna</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
          disabled={isLoading}
        />
      </div>
    </Form>
  );
};

export default Login;