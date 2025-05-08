import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [admin, setAdmin] = useState(null);

	useEffect(() => {
		const savedAdmin = JSON.parse(localStorage.getItem("adminData"));
		if (savedAdmin) {
			setAdmin(savedAdmin);
		}
	}, []);

	const login = (adminData) => {
		localStorage.setItem("adminData", JSON.stringify(adminData));
		setAdmin(adminData);
	};

	const logout = () => {
		localStorage.removeItem("adminData");
		setAdmin(null);
	};

	return <AuthContext.Provider value={{ admin, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
