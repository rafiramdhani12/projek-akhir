import React from "react";

const Button = ({ className, onClick, content ,type}) => {
	return (
		<button type={type} className={className} onClick={onClick}>
			{content}
		</button>
	);
};

export default Button;
