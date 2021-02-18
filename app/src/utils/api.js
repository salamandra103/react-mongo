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
	if (error.response.data.message === "jwt expired") {
		store.dispatch(removeUser());
	}
	return Promise.reject(error);
});

export default _axios;
