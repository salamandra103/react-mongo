import axios from "axios";

const _axios = axios.create({
	baseURL: process.env.API_URL,
	responseType: "json",
	headers: {
		Authorization: localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")).token : "",
	},
});

_axios.interceptors.request.use((config) => {
	const _config = config;
	_config.headers.Authorization = localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")).token : "";
	return _config;
},
(error) => {
	console.log(error);
	return Promise.reject(error);
});

export default _axios;
