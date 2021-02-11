import axios from "axios";

export default axios.create({
	baseURL: process.env.API_URL,
	responseType: "json",
	headers: {
		Authorization: JSON.parse(localStorage.getItem("user_info")).token || "",
	},
});
