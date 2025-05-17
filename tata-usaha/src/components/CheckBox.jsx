import React from "react";

const CheckBox = ({ title, value, checked, onChange }) => {
	return (
		<div className="form-control">
			<label className="label cursor-pointer">
				<span className="label-text">
					{title} (Rp{value.toLocaleString("id-ID")})
				</span>
				<input type="checkbox" className="checkbox" checked={checked} onChange={onChange} />
			</label>
		</div>
	);
};

export default CheckBox;
