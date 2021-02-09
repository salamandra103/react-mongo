const initialState = JSON.parse(localStorage.getItem("user_info")) || null;

const user = (state = initialState, action) => {
	switch (action.type) {
	case "SET_USER":
		return { ...action.payload };
	case "REMOVE_USER":
		localStorage.removeItem("user_info");
		return null;
	default:
		return state;
	}
};

export default user;
