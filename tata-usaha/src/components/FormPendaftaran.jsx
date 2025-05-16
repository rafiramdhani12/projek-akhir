const FormPendaftaran = ({ title, children, onSubmit, error }) => {
	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-5 mb-5">
			<h2 className="text-xl font-semibold mb-4">{title}</h2>
			<form onSubmit={onSubmit}>
				{children}
				<button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
					Daftar
				</button>
				{error && <p className="text-red-500 mt-2">{error}</p>}
			</form>
		</div>
	);
};

export default FormPendaftaran;
