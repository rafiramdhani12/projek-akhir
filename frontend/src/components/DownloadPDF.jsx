import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontFamily: "Helvetica",
	},
	title: {
		fontSize: 18,
		marginBottom: 20,
		textAlign: "center",
		fontWeight: "bold",
	},
	content: {
		fontSize: 12,
		marginBottom: 10,
	},
});

export const DownloadPDF = ({ jumlahSiswa, pemasukan }) => {
	return (
		<>
			<Document>
				<Page size="A4" style={styles.page}>
					<View>
						<Text style={styles.title}>Laporan Prediksi Pemasukan</Text>
						<Text style={styles.content}>Jumlah Siswa: {jumlahSiswa}</Text>
						<Text style={styles.content}>Prediksi Pemasukan: Rp {pemasukan.toLocaleString("id-ID")}</Text>
						<Text style={styles.content}>Tanggal: {new Date().toLocaleDateString("id-ID")}</Text>
					</View>
				</Page>
			</Document>
		</>
	);
};
