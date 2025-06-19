import emailjs from "emailjs-com";

export const sendPasswordEmail = async ({ name, email, password }) => {
	try {
		const res = await emailjs.send(
			"service_se3liyf",
			"template_xo57dd9",
			{
				name: name,
				email: email,
				password: password,
			},
			"6G7jO2HgBwwCCQscR"
		);
		console.log(`email terkirim ${res.status} ${res.text}`);
		alert("email password berhasil terkirim");
	} catch (error) {
		console.error(`gagal mengirim email ${error}`);
		alert("gagal mengirim email , coba lagi nanti");
	}
};
