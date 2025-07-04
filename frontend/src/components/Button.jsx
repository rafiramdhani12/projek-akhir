import React from "react";

const Button = ({ className, onClick, content, type }) => {
	return (
		<button type={type} className={`btn btn-${className} text-white ${className}`} onClick={onClick}>
			{content}
		</button>
	);
};

export default Button;
