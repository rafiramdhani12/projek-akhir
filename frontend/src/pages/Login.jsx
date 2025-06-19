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
			});

			console.log("Full response:", res);

			const data = res.data;

			if (!data || !data.token) {
				throw new Error("Token tidak diterima dari server");
			}

			// Ambil info dari response atau fallback ke input
			const user = data.superAdmin || data.admin || data.tataUsaha || {};
			const userId = user.id;
			const userName = user.name || name;
			const userRole = role; // sudah ditentukan dari select

			// Simpan ke context
			login({
				id: userId,
				name: userName,
				role: userRole,
				token: data.token,
			});

			// Redirect berdasarkan role
			if (userRole === "admin") {
				navigate("/dashboard/admin");
			} else if (userRole === "tata-usaha") {
				navigate("/dashboard/tata-usaha");
			} else {
				navigate("/dashboard/superadmin");
			}
		} catch (err) {
			console.error("Error details:", {
				error: err,
				response: err.response,
			});

			const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat login";
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form title="Login" onSubmit={handleLogin} error={error} button={isLoading ? "Memproses..." : "Login"} disabled={isLoading} className={"success"}>
			<div className="mb-4">
				<label htmlFor="role" className="block text-gray-700 mb-2">
					Login sebagai
				</label>
				<select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 border rounded-md" disabled={isLoading}>
					<option value="superadmin">Super Admin</option>
					<option value="admin">Admin</option>
					<option value="tata-usaha">Tata Usaha</option>
				</select>
			</div>

			<div className="mb-4">
				<label htmlFor="name" className="block text-gray-700 mb-2">
					Nama Pengguna
				</label>
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
				<label htmlFor="password" className="block text-gray-700 mb-2">
					Password
				</label>
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
