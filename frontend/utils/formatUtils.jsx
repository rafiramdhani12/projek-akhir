// Format tanggal dari string ISO ke format lokal
export const formatDate = (dateString) => {
	if (!dateString) return "-";
	const options = { day: "2-digit", month: "2-digit", year: "numeric" };
	return new Date(dateString).toLocaleDateString("id-ID", options);
};

// Format currency Rupiah
export const formatCurrency = (amount) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amount);
};
