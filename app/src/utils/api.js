import axios from "axios";
import store from "@/store";
import { removeUser } from "@/store/actions/user";

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

_axios.interceptors.response.use((response) => response, (error) => {
	if (error.response.data.message === "Access token expired") {
		return _axios.post("auth/token", {
			id: localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")).id : "",
		}).then((res) => {
			localStorage.setItem("user_info", JSON.stringify(res.data));
			return _axios.request(error.config);
		});
	}
	if (error.response.data.message === "Refresh token expired") {
		store.dispatch(removeUser());
	}
	return Promise.reject(error);
});

export default _axios;
