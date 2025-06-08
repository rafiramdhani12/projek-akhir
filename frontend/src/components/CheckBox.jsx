const CheckBox = ({ title, value, checked, onChange }) => {
	return (
		<div className="form-control">
			<label className="label cursor-pointer">

				<span className="label-text">{title} {typeof value === "number" ? `(Rp ${value.toLocaleString("id-ID")})` : null}</span>

				<input type="checkbox" className="checkbox" checked={checked} onChange={onChange} />

			</label>
		</div>
	);
};

export default CheckBox; 
