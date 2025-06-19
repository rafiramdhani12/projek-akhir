import React from "react";
import Button from "./Button";

const Modal = ({ title, label, state, setState, setForm, util, nominal, button, extra }) => {
	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-6 w-full max-w-md">
					<Button onClick={() => setState(false)} className="btn btn-error text-white p-2 mb-4" content="Tutup" />
					<h2 className="text-lg font-bold mb-4">{title}</h2>
					<div className="mb-4">
						<label className="block text-gray-700 mb-1">{label}</label>
						<input
							type="text"
							name="title"
							value={state.title}
							onChange={(e) => setForm({ ...state, [e.target.name]: e.target.value })}
							className="w-full px-3 py-2 border rounded-md"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-1">{nominal}</label>
						<input
							type="number"
							name="value"
							value={state.value}
							onChange={(e) => setForm({ ...state, [e.target.name]: Number(e.target.value) })}
							className="w-full px-3 py-2 border rounded-md"
						/>
					</div>
					{button == null ? (
						""
					) : (
						<Button
							className="btn btn-success p-2"
							content="Simpan"
							onClick={async () => {
								await util();
								setState(false);
							}}
						/>
					)}
					{extra}
				</div>
			</div>
		</>
	);
};

export default Modal;
