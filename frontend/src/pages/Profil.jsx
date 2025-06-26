import { useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useTu } from "../context/TuContext";

const Profil = () => {
	const { role, id: userId, name } = useAuth();
	const { admin, fetchDataAdmin } = useAdmin();
	const { tataUsaha, fetchDataTu } = useTu();
	const navigate = useNavigate();
	console.log(admin);

	useEffect(() => {
		fetchDataAdmin();
	}, [userId]);
	useEffect(() => {
		fetchDataTu();
	}, [userId]);

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="w-full max-w-sm bg-white rounded-lg shadow-sm overflow-hidden">
				<div className="bg-white p-6 border-b border-gray-100">
					<Button className="btn btn-error text-white mb-4" content="back" onClick={() => window.history.back()} />

					<div className="flex items-center space-x-4">
						<div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-medium">
							{name.charAt(0).toUpperCase()}
						</div>
						<div>
							<h1 className="text-lg font-semibold text-gray-900">{name}</h1>
							<p className="text-sm text-gray-500">{role}</p>
						</div>
					</div>
				</div>
				{role === "admin" ? (
					<>
						{admin?.map((item) => (
							<>
								<div className="p-6 space-y-4">
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">User ID</span>
										<span className="text-sm font-medium text-gray-900">{userId}</span>
									</div>

									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">Account Type</span>
										<span className="text-sm font-medium text-gray-900 capitalize">{role.toLowerCase()}</span>
									</div>

									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">email</span>
										<span className="text-sm font-medium text-gray-900">{item.email}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">address</span>
										<span className="text-sm font-medium text-gray-900">{item.address}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">phone number</span>
										<span className="text-sm font-medium text-gray-900">+{item.phoneNumber}</span>
									</div>
								</div>
							</>
						))}
					</>
				) : (
					<>
						{tataUsaha?.map((item) => (
							<>
								<div className="p-6 space-y-4">
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">User ID</span>
										<span className="text-sm font-medium text-gray-900">{userId}</span>
									</div>

									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">Account Type</span>
										<span className="text-sm font-medium text-gray-900 capitalize">{role.toLowerCase()}</span>
									</div>

									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">email</span>
										<span className="text-sm font-medium text-gray-900">{item.email}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">address</span>
										<span className="text-sm font-medium text-gray-900">{item.address}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-500">phone number</span>
										<span className="text-sm font-medium text-gray-900">+{item.phoneNumber}</span>
									</div>
								</div>
							</>
						))}
					</>
				)}

				{/* Actions */}
				<div className="px-6 pb-6">
					<button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
						Edit Profile
					</button>
					<div className="flex justify-end">
						<Button className="btn btn-error text-white mt-4" content="reign" onClick={() => navigate(`/ketentuan-resign/${userId}`)} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profil;
