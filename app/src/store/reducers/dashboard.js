import user from "./user";

const initialState = [];

const dashboard = (state = initialState, action) => {
    switch(action.type) {
        case "SET_NEW_TREE":
            return [...state, ...action.payload];
        case "EDIT_EXISTING_TREE":
            return state;
        default:
            return state;
    }
}

export default dashboard;