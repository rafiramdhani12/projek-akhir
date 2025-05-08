import FormPendaftaran from "../components/FormPendaftaran";

const Pendaftaran = ({ onSuccess, handleSubmit, handleChange, formData }) => {
	return (
		<>
			<FormPendaftaran
				onSuccess={onSuccess}
				formData={formData}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>
		</>
	);
};

export default Pendaftaran;
