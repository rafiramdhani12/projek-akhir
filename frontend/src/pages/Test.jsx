import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const res = await axios.get("http://localhost:3000/api/posts");
			setData(res.data.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="grid grid-cols-3 gap-4 mt-4 mb-4">
				{data.map((item) => (
					<div className="card bg-base-100 w-96 shadow-xl">
						<>
							<figure>
								<img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
							</figure>
							<div className="card-body">
								<h2 className="card-title">{item.name}</h2>
								<p>{item.price}</p>
								<div className="card-actions justify-end">
									<button className="btn btn-primary">Buy Now</button>
								</div>
							</div>
						</>
					</div>
				))}
			</div>
		</>
	);
};

export default Test;
