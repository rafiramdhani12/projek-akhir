import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// Gunakan useEffect untuk memastikan localStorage hanya diakses di client-side
	const [authState, setAuthState] = useState({
		id: "",
		name: "",
		role: "",
		token: "",
	});

	const [isHydrated, setIsHydrated] = useState(false); // tambahkan flag

	// Inisialisasi state dari localStorage saat komponen mount
	useEffect(() => {
		const id = localStorage.getItem("id") || "";
		const name = localStorage.getItem("name") || "";
		const role = localStorage.getItem("role") || "";
		const token = localStorage.getItem("token") || "";
		setAuthState({ id, name, role, token });
		setIsHydrated(true);
	}, []);

	const login = ({ id, name, role, token }) => {
		// Simpan ke state dan localStorage
		setAuthState({ id, name, role, token });
		localStorage.setItem("id", id);
		localStorage.setItem("name", name);
		localStorage.setItem("role", role);
		localStorage.setItem("token", token);
	};

	const logout = () => {
		// Clear state dan localStorage
		setAuthState({ id: "", name: "", role: "", token: "" });
		localStorage.removeItem("id");
		localStorage.removeItem("name");
		localStorage.removeItem("role");
		localStorage.removeItem("token");
	};

	return <AuthContext.Provider value={{ ...authState, login, logout, isHydrated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
