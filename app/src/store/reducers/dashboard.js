import user from "./user";

const initialState = [];

const dashboard = (state = initialState, action) => {
	switch (action.type) {
	case "SET_TREE_SUCCESS": {
		// ПЕРЕДЕЛАТЬ МЕТОД
		// const _arr = [...action.payload];
		// _arr.forEach((section, sectionIndex) => {
		// 	if (!section.title.length) {
		// 		_arr.splice(sectionIndex, 1);
		// 	} else if (section.categories.length) {
		// 		section.categories.forEach((category, categoryIndex) => {
		// 			if (!category.title.length) {
		// 				_arr[sectionIndex].categories.splice(categoryIndex, 1);
		// 			} else if (category.elements.length) {
		// 				category.elements.forEach((element, elementIndex) => {
		// 					if (!element.title.length) {
		// 						_arr[sectionIndex].categories[categoryIndex].elements.splice(elementIndex, 1);
		// 					}
		// 				});
		// 			}
		// 		});
		// 	}
		// });

		// const _arr = (function recursive(items) {
		// 	items.forEach((item, index) => {
		// 		if (!item.title.length) {
		// 			items.splice(index, 1);
		// 		}
		// 		for (const key in item) {
		// 			if (Array.isArray(item[key])) {
		// 				recursive(item[key]);
		// 			}
		// 		}
		// 	});

		// 	// for (let i = 0; i < items.length; i++) {
		// 	// 	if (!items[i].title.length) {
		// 	// 		items.splice(i, 1);
		// 	// 	}
		// 	// 	for (const key in items[i]) {
		// 	// 		if (Array.isArray(items[i][key])) {
		// 	// 			recursive(items[i][key]);
		// 	// 		}
		// 	// 	}
		// 	// }

		// 	return items;
		// }([...action.payload]));
		
		return [...state, ...action.payload];
	}
	case "GET_TREE_SUCCESS": {
		return action.payload;
	}
	case "DELETE_TREE_SUCCESS": {
		const _arr = [...state];
		_arr.splice(_arr.findIndex((item) => item._id === action.id), 1);
		return _arr;
	}
	case "EDIT_EXISTING_TREE":
		return state;
	default:
		return state;
	}
};

export default dashboard;
