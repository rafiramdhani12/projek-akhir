import { useNavigate, useParams } from "react-router-dom";
import { useSiswa } from "../context/SiswaContext";
import { useEffect, useState } from "react";

const Pelunasan = () => {
	const { id } = useParams(); // ambil dari id dari url
	const navigate = useNavigate();
	const { siswa, pelunasan, error } = useSiswa();

	const selectedSiswa = siswa.find((s) => String(s.id) === String(id)); //* method find ((e) => element (logika) (yg ingin di cari))

	const [balance, setBalance] = useState(2500000);

	useEffect(() => {
		if (selectedSiswa) {
			setBalance(selectedSiswa.balance);
		}
	}, [selectedSiswa]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		if (!selectedSiswa) return;

		const updateData = {
			...selectedSiswa,
			balance: balance,
		};
		try {
			await pelunasan(updateData);
			navigate("/dashboard/admin");
		} catch (err) {
			console.error(`gagal update siswa : ${err}`);
		}
	};

	return (
		<>
			<div>
				<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mb-10 mt-10">
					<h2 className="text-xl font-semibold mb-4">Pelunasan Siswa</h2>
					<h1 className="text-lg font-semibold mb-4">{selectedSiswa?.nama}</h1>
					<form onSubmit={handleUpdate}>
						<div className="mb-4">
							<label htmlFor="balance" className="block text-gray-700 mb-2">
								Balance
							</label>
							<input
								type="number"
								id="balance"
								name="balance"
								value={balance}
								onChange={(e) => setBalance(Number(e.target.value))}
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>

						<button
							type="submit"
							className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
							lunas
						</button>
						{error && <p className="text-red-500 mt-2">{error}</p>}
					</form>
				</div>
			</div>
		</>
	);
};

export default Pelunasan;
