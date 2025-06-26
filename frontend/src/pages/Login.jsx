import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import axios from "axios";
import Form from "../components/Form";
import Button from "../components/Button";

const Login = () => {
	const [idEmployee, setIdEmployee] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isShow, setIsShow] = useState(false);

	const navigate = useNavigate();
	const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const res = await axios.post(`http://localhost:8080/api/login`, {
				idEmployee,
				password,
			});

			const { token, user } = res.data;

			if (!token || !user) throw new Error("Data tidak lengkap dari server");

			login({
				id: user.id,
				name: user.name,
				role: user.role,
				token,
			});

			navigate(`/dashboard/${user.role}`);
		} catch (err) {
			console.error("Login error:", err);
			const msg = err.response?.data?.message || err.message || "Login gagal";
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form title="Login" onSubmit={(e) => e.preventDefault()} error={error} button={null}>
			<div className="mb-4">
				<label htmlFor="idEmployee" className="block text-gray-700 mb-2">
					ID Karyawan
				</label>
				<input
					type="text"
					id="idEmployee"
					value={idEmployee}
					onChange={(e) => setIdEmployee(e.target.value)}
					className="w-full px-3 py-2 border rounded-md"
					disabled={isLoading}
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="password" className="block text-gray-700 mb-2">
					Password
				</label>
				<div className="flex items-center gap-2">
					<input
						type={isShow ? "text" : "password"}
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="input w-full px-3 py-2 rounded-md"
						disabled={isLoading}
					/>
					<Button content={isShow ? <Eye /> : <EyeClosed />} className="success" onClick={() => setIsShow(!isShow)} />
				</div>
				<NavLink to="/lupa-password" className="text-sm text-blue-600 ">
					Lupa password ?
				</NavLink>
			</div>

			<Button className="success mb-2" onClick={handleLogin} content={isLoading ? "Memproses..." : "Login"} />
		</Form>
	);
};

export default Login;
