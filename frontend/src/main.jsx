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
import { SuperAdminProvider } from "./context/SuperAdminContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import emailjs from "emailjs-com";
emailjs.init("6G7jO2HgBwwCCQscR");

createRoot(document.getElementById("root")).render(
	// * ini adalah awalan dari aplikasi tu sma App / pusatnya dibungkus oleh browser router auth siswa pembayaran util provider
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<SuperAdminProvider>
					<AdminProvider>
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
					</AdminProvider>
				</SuperAdminProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
