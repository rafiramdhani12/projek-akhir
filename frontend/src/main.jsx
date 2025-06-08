import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SiswaProvider } from "./context/SiswaContext.jsx";
import { PembayaranProvider } from "./context/PembayaranSppContext.jsx";
import { UtilProvider } from "./context/UtilContext.jsx";
import { DataProvider } from "./context/dataContext.jsx";
import { TuProvider } from "./context/TuContext.jsx";

createRoot(document.getElementById("root")).render(
	// * ini adalah awalan dari aplikasi tu sma App / pusatnya dibungkus oleh browser router auth siswa pembayaran util provider
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<TuProvider>
				<SiswaProvider>
					<PembayaranProvider>
						<UtilProvider>
							<DataProvider>
								<App />
							</DataProvider>
						</UtilProvider>
					</PembayaranProvider>
				</SiswaProvider>
				</TuProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
