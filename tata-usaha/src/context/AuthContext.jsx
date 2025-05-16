import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [admin, setAdmin] = useState(() => {
		const saved = localStorage.getItem("admin");
		return saved ? JSON.parse(saved) : null;
	});

	const [token, setToken] = useState(() => {
		return localStorage.getItem("token") || null;
	});

	const login = (adminData) => {
		localStorage.setItem("token", adminData.token);
		localStorage.setItem("admin", JSON.stringify(adminData.admin));
		setToken(adminData.token);
		setAdmin(adminData.admin);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("admin");
		setToken(null);
		setAdmin(null);
	};

	return <AuthContext.Provider value={{ admin, token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
