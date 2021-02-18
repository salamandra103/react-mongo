import API from "@/utils/api";

export const setUserStarted = () => ({
	type: "SET_USER_STARTED",
});

export const setUserSuccess = (payload) => ({
	type: "SET_USER_SUCCESS",
	payload,
});

export const setUserError = (err) => ({
	type: "SET_USER_ERROR",
	err,
});

export const setUserAsync = (payload) => async(dispatch) => {
	dispatch(setUserStarted());
	await API.post("auth/login", payload)
		.then((res) => {
			dispatch(setUserSuccess(res.data));
		}).catch((err) => {
			dispatch(setUserError(err));
		});
};

export const removeUser = (payload) => ({
	type: "REMOVE_USER",
	payload,
});
