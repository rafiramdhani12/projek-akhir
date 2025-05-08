import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

	const handleLogin = (newtoken) => {
		localStorage.setItem("token", newtoken);
		setToken(newtoken);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setIsAuthenticated(false);
	};

	useEffect(() => {
		setIsAuthenticated(!!token);
	}, [token]);

	return (
		<AuthContext.Provider value={{ token, handleLogin, logout, isAuthenticated }}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
