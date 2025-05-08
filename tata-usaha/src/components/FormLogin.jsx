import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ⬅️ import context

const FormLogin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth(); // ⬅️ panggil login dari context

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const res = await axios.post("http://localhost:8080/api/admin/login", {
				username,
				password,
			});

			if (res.data.status === "success") {
				login(res.data.admin); // ⬅️ set data ke context + localStorage
				navigate("/dashboard");
			} else {
				setError(res.data.message);
			}
		} catch (err) {
			setError("Terjadi kesalahan, silakan coba lagi");
			console.error(err);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mb-10 mt-10">
			<h2 className="text-xl font-semibold mb-4">Login Admin</h2>
			<form onSubmit={handleLogin}>
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
				<button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
					Login
				</button>
				{error && <p className="text-red-500 mt-2">{error}</p>}
			</form>
		</div>
	);
};

export default FormLogin;
