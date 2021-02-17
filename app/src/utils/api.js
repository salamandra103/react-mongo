import axios from "axios";

const _axios = axios.create({
	baseURL: process.env.API_URL,
	responseType: "json",
	headers: {
		Authorization: localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")).accessToken : "",
	},
});

_axios.interceptors.request.use((config) => {
	const _config = config;
	_config.headers.Authorization = localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")).accessToken : "";
	return _config;
},
(error) => {
	console.log(error);
	return Promise.reject(error);
});

_axios.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default _axios;
