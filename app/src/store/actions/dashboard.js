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

export const setTreeAsync = (payload) => (dispatch) => {
	dispatch(setTreeStarted);
	API.post("dashboard", payload)
		.then((res) => {
			dispatch(setTreeSuccess(res.data));
		}).catch((err) => {
			dispatch(setTreeError(err));
		});
};

export const getTreeStarted = () => ({
	type: "GET_TREE_STARTED",
});

export const getTreeSuccess = (payload) => ({
	type: "GET_TREE_SUCCESS",
	payload,
});

export const getTreeError = (err) => ({
	type: "GET_TREE_ERROR",
	err,
});

export const getTreeAsync = () => (dispatch) => {
	dispatch(getTreeStarted);
	API.get("dashboard")
		.then((res) => {
			dispatch(getTreeSuccess(res.data));
		}).catch((err) => {
			dispatch(getTreeError(err));
		});
};

export const deleteTreeStarted = () => ({
	type: "DELETE_TREE_STARTED",
});

export const deleteTreeSuccess = (payload) => ({
	type: "DELETE_TREE_SUCCESS",
	id: payload.id,
});

export const deleteTreeError = (err) => ({
	type: "DELETE_TREE_ERROR",
	err,
});

export const deleteTreeAsync = (id) => (dispatch) => {
	dispatch(deleteTreeStarted());
	API.delete("dashboard", { data: { _id: id } })
		.then((res) => {
			dispatch(deleteTreeSuccess(res.data));
		}).catch((err) => {
			console.error(err);
			dispatch(deleteTreeError(err));
		});
};

export const editTree = (payload) => ({
	type: "EDIT_TREE",
	payload,
});

export const setSectionEditable = (id) => ({
	type: "SET_SECTION_EDITABLE",
	id,
});

export const editTreeStarted = () => ({
	type: "EDIT_TREE_STARTED",
});

export const editTreeSuccess = () => ({
	type: "EDIT_TREE_SUCCESS",
});

export const editTreeError = (err) => ({
	type: "EDIT_TREE_ERROR",
	err,
});

export const editTreeAsync = (payload) => (dispatch) => {
	dispatch(editTreeStarted());
	const _payload = ({ editable, ...item }) => item;
	API.put("dashboard", _payload(payload))
		.then((res) => {
			dispatch(editTreeSuccess());
		}).catch((err) => {
			dispatch(editTreeError(err));
		});
};
