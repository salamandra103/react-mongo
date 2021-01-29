const initialState = null;

const user = (state = initialState, action) => {
	switch (action.type) {
	case "SET_USER":
		return {...state};
	default:
		return state;
	}
};

export default user;