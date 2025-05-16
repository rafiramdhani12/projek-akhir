const NotFound = () => {
	const random = Math.floor(Math.random() * 4);

	const codeName = ["XVX-016RN", "ASW-G-35", "ASW-G-8", "RX-93"];

	return (
		<>
			<div className="text-center font-bold text-3xl min-h-52 mt-40 overflow-hidden">
				<h1>ERROR 404 | {codeName[random]}</h1>
			</div>
		</>
	);
};

export default NotFound;
