import user from "./user";

const initialState = [];

const dashboard = (state = initialState, action) => {
	switch (action.type) {
	case "SET_NEW_TREE": {
		// ПЕРЕДЕЛАТЬ МЕТОД
		const _arr = [...action.payload];
		_arr.forEach((section, sectionIndex) => {
			if (!section.title.length) {
				_arr.splice(sectionIndex, 1);
			}
			if (section.categories.length) {
				section.categories.forEach((category, categoryIndex) => {
					if (!category.title.length) {
						_arr[sectionIndex].categories.splice(categoryIndex, 1);
					}
					if (category.elements.length) {
						category.elements.forEach((element, elementIndex) => {
							if (!element.title.length) {
								_arr[sectionIndex].categories[categoryIndex].elements.splice(elementIndex, 1);
							}
						});
					}
				});
			}
		});
		
		console.log(_arr);

		return [...state, ...action.payload];
	}
	case "EDIT_EXISTING_TREE":
		return state;
	default:
		return state;
	}
};

export default dashboard;
