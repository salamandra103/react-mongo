import API from "@/utils/api";

export const setTreeStarted = () => ({
	type: "SET_TREE_STARTED",
});

export const setTreeSuccess = (payload) => ({
	type: "SET_TREE_SUCCESS",
	payload,
});

export const setTreeError = (err) => ({
	type: "SET_TREE_ERROR",
	err,
});

export const setTree = (payload) => ({
	type: "SET_TREE",
	payload,
});

export const setTreeAsync = (payload) => (dispatch) => {
	dispatch(setTreeStarted);
	API.post("dashboard", payload)
		.then((res) => {
			dispatch(setTreeSuccess(res.data));
		}).catch((err) => {
			dispatch(setTreeError(err));
		});
};

export const editExistingTree = (payload) => ({
	type: "EDIT_EXISTING_TREE",
	payload,
});
