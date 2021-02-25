import user from "./user";

const initialState = [];

const dashboard = (state = initialState, action) => {
	switch (action.type) {
	case "SET_TREE_SUCCESS": {
		return [...state, ...action.payload];
	}
	case "GET_TREE_SUCCESS": {
		return action.payload.map((item) => ({ ...item, editable: false }));
	}
	case "DELETE_TREE_SUCCESS": {
		const _arr = [...state];
		_arr.splice(_arr.findIndex((item) => item._id === action.id), 1);
		return _arr;
	}
	case "EDIT_TREE":
		return action.payload;
	case "SET_SECTION_EDITABLE":
		return state.map((item) => {
			if (item._id === action.id) {
				return { ...item, editable: !item.editable };
			}
			return item;
		});
	case "EDIT_TREE_SUCCESS":
		return state;
	default:
		return state;
	}
};

export default dashboard;
