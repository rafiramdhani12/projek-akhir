import React from "react";

const Form = ({ title, children, onSubmit, error, button, className }) => {
	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mb-10 mt-10">
			<h2 className="text-xl font-semibold mb-4">{title}</h2>
			<form onSubmit={onSubmit}>
				{children}

				{button ? (
					<button type="submit" className={`btn btn-${className} text-white font-semibold py-2 px-4 rounded mt-4`}>
						{button}
					</button>
				) : null}

				{error && <p className="text-red-500 mt-2">{error}</p>}
			</form>
		</div>
	);
};

export default Form;
