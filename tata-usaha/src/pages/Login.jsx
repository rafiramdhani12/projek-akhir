import React from "react";
import FormLogin from "../components/FormLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const res = await axios.post("http://localhost:8080/api/admin/login", {
				username,
				password,
			});

			const data = res.data;

			if (data.status === "success") {
				login(data); // simpan ke context
				navigate("/dashboard/admin");
			} else {
				alert(data.message);
			}
		} catch (err) {
			setError("Terjadi kesalahan, silakan coba lagi");
			console.error(err);
		}
	};

	return (
		<FormLogin title="Login" onSubmit={handleLogin} error={error}>
			<div className="mb-4">
				<label htmlFor="nama" className="block text-gray-700 mb-2">
					Username
				</label>
				<input
					type="text"
					id="nama"
					name="nama"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full px-3 py-2 border rounded-md"
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
				/>
			</div>
		</FormLogin>
	);
};

export default Login;
