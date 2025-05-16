import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SiswaProvider } from "./context/SiswaContext.jsx";
import { PembayaranProvider } from "./context/PembayaranSppContext.jsx";
import { UtilProvider } from "./context/UtilContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<SiswaProvider>
					<PembayaranProvider>
						<UtilProvider>
							<App />
						</UtilProvider>
					</PembayaranProvider>
				</SiswaProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
