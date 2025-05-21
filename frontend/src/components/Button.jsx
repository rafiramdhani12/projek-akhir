import React from "react";

const Button = ({ className, onClick, content }) => {
	return (
		<button className={className} onClick={onClick}>
			{content}
		</button>
	);
};

export default Button;
