import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Resign = () => {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [hideModal, setHideModal] = useState(false);
	const videoRef = useRef(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowModal(true);
		}, 3000); // Tampilkan modal setelah 3 detik

		return () => clearTimeout(timer);
	}, []);

	const handleVideoEnd = () => {
		setTimeout(() => {
			setHideModal(true); // Tutup modal 3 detik setelah video selesai
		}, 3000);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.8 }}
			className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
			{/* Main Card */}
			<motion.div
				initial={{ scale: 0.9, y: 50 }}
				animate={{ scale: 1, y: 0 }}
				transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
				className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full mx-4 z-10">
				{/* Animated Checkmark */}
				<motion.div
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="mx-auto flex items-center justify-center mb-6">
					<svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</motion.div>

				<motion.h1
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.7 }}
					className="text-3xl font-bold text-gray-800 mb-4">
					Selamat Jalan!
				</motion.h1>

				<motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }} className="text-gray-600 mb-6 text-lg">
					Terima kasih atas kontribusinya selama ini. Semoga sukses untuk perjalanan baru Anda!
				</motion.p>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8">
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => navigate("/")}
						className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md hover:bg-indigo-700 transition-all">
						Kembali ke Beranda
					</motion.button>
				</motion.div>
			</motion.div>

			{/* Floating Goodbye Message */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1.5 }}
				className="mt-12 text-indigo-400 font-medium text-lg z-10">
				Sampai jumpa lagi!
			</motion.div>

			{/* Animated Confetti */}
			{[...Array(20)].map((_, i) => (
				<motion.div
					key={i}
					initial={{ y: -10, opacity: 0 }}
					animate={{ y: [0, 100], opacity: [1, 0], x: Math.random() * 100 - 50 }}
					transition={{
						delay: 1.8 + i * 0.05,
						duration: 2,
						repeat: Infinity,
						repeatDelay: 5,
					}}
					className="absolute text-yellow-400 text-xl"
					style={{
						left: `${Math.random() * 100}%`,
						top: "-10%",
					}}>
					{["🎉", "✨", "🌟", "🥳"][Math.floor(Math.random() * 4)]}
				</motion.div>
			))}

			{/* Popup Modal Video */}
			{showModal && !hideModal && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.4 }}
						className="bg-white rounded-xl shadow-lg p-4 max-w-xl w-full">
						<video ref={videoRef} onEnded={handleVideoEnd} autoPlay controls className="rounded-lg w-full max-h-[400px] object-cover">
							<source src="/videos/Omedetou.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</motion.div>
				</div>
			)}
		</motion.div>
	);
};

export default Resign;
