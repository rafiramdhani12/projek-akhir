const Test = () => {
	return (
		<div className="grid grid-cols-3 gap-4 mt-4 mb-4">
			<div className="sketchfab-embed-wrapper">
				<iframe
					title="Gundam Vidar"
					src="https://sketchfab.com/models/62400639a96842de97a33eb2534e0e07/embed"
					allow="autoplay; fullscreen; xr-spatial-tracking"
					allowFullScreen
					mozallowfullscreen="true"
					webkitallowfullscreen="true"
					style={{ width: "100%", height: "480px", border: "none" }}
				/>
				<p style={{ fontSize: "13px", fontWeight: "normal", margin: "5px", color: "#4A4A4A" }}>
					<a
						href="https://sketchfab.com/3d-models/gundam-vidar-62400639a96842de97a33eb2534e0e07?utm_medium=embed&utm_campaign=share-popup&utm_content=62400639a96842de97a33eb2534e0e07"
						target="_blank"
						rel="nofollow"
						style={{ fontWeight: "bold", color: "#1CAAD9" }}>
						Gundam Vidar
					</a>{" "}
					by{" "}
					<a
						href="https://sketchfab.com/number107?utm_medium=embed&utm_campaign=share-popup&utm_content=62400639a96842de97a33eb2534e0e07"
						target="_blank"
						rel="nofollow"
						style={{ fontWeight: "bold", color: "#1CAAD9" }}>
						number107
					</a>{" "}
					on{" "}
					<a
						href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=62400639a96842de97a33eb2534e0e07"
						target="_blank"
						rel="nofollow"
						style={{ fontWeight: "bold", color: "#1CAAD9" }}>
						Sketchfab
					</a>
				</p>
			</div>
		</div>
	);
};

export default Test;
