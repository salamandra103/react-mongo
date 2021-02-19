import React, { useState, SyntheticEvent } from "react";
import { connect } from "react-redux";

import { setTreeAsync, setTreeSuccess } from "@/store/actions/dashboard";
import { Action } from "../../node_modules/redux/index";
import { ThunkAction } from "../../node_modules/redux-thunk/index";

type Props = {
    visible: boolean,
	data: Array<Tree>,
} & DispatchProps

interface Section {
	title: string,
	categories: Array<Category>
}

interface Category {
	title: string,
	elements: Array<Element>
}

interface Element {
	title: string
}

interface Tree {
	title: string,
	categories: Array<Category>
}

interface DispatchProps {
	setTreeAsync: (tree: Array<Tree>) => void
	setTreeSuccess: (tree: Array<Tree>) => void
}

const DashboardForm: React.FC<Props> = ({
	setTreeAsync, setTreeSuccess, visible, data,
} : Props) => {
	const [tree, editTree] = useState<Array<Tree>>([
		{
			title: "123",
			categories: [
				{
					title: "",
					elements: [
						{
							title: "",
						},
					],
				},
			],
		},
	]);

	function changeElementValue(type: string, value: string, sectionId?: number, categoryId?: number, elementId?: number): void {
		let newTree: Array<Tree> = [...tree];
		if (type === "section") {
			try {
				if (typeof sectionId === "undefined") {
					throw new Error("Отсутствует обязательный параметр sectionId");
				}
				newTree = newTree.map((item, id) => {
					if (id === sectionId) {
						return {
							...item,
							title: value,
						};
					}
					return item;
				});
			} catch (err) {
				console.error(err);
			}
		} else if (type === "category") {
			try {
				if (typeof sectionId === "undefined") {
					throw new Error("Отсутствует обязательный параметр sectionId");
				}
				if (typeof categoryId === "undefined") {
					throw new Error("Отсутствует обязательный параметр categoryId");
				}
				newTree = newTree.map((item, id) => {
					if (id === sectionId) {
						return {
							...item,
							categories: item.categories.map((itemCategory, idCategory) => {
								if (idCategory === categoryId) {
									return {
										...itemCategory,
										title: value,
									};
								}
								return itemCategory;
							}),
						};
					}
					return item;
				});
			} catch (err) {
				console.error(err);
			}
		} else if (type === "element") {
			try {
				if (typeof sectionId === "undefined") {
					throw new Error("Отсутствует обязательный параметр sectionId");
				}
				if (typeof categoryId === "undefined") {
					throw new Error("Отсутствует обязательный параметр categoryId");
				}
				if (typeof elementId === "undefined") {
					throw new Error("Отсутствует обязательный параметр elementId");
				}
				newTree = newTree.map((item, id) => {
					if (id === sectionId) {
						return {
							...item,
							categories: item.categories.map((itemCategory, idCategory) => {
								if (idCategory === categoryId) {
									return {
										...itemCategory,
										elements: itemCategory.elements.map((itemElement, idElement) => {
											if (idElement === elementId) {
												return {
													...itemElement,
													title: value,
												};
											}
											return itemElement;
										}),
									};
								}
								return itemCategory;
							}),
						};
					}
					return item;
				});
			} catch (err) {
				console.error(err);
			}
		}
		editTree(newTree);
	}

	function addElement(type: string, sectionId?: number, categoryId?: number) {
		const newTree: Array<Tree> = [...tree];
		if (type === "section") {
			newTree.push({
				title: "",
				categories: [
					{
						title: "",
						elements: [
							{
								title: "",
							},
						],
					},
				],
			});
		} else if (type === "category") {
			newTree[sectionId].categories.push({
				title: "",
				elements: [
					{
						title: "",
					},
				],
			});
		} else if (type === "element") {
			try {
				if (typeof categoryId === "undefined") {
					throw new Error("Отсутствует обязательный параметр categoryId");
				}
				newTree[sectionId].categories[categoryId].elements.push({
					title: "",
				});
			} catch (err) {
				console.error(err);
			}
		}
		editTree(newTree);
	}

	function removeElement(type: string, sectionId?: number, categoryId?: number) {
		const newTree: Array<Tree> = [...tree];
		if (type === "section") {
			newTree.splice(-1, 1);
		} else if (type === "category") {
			newTree[sectionId].categories.splice(-1, 1);
		} else if (type === "element") {
			newTree[sectionId].categories[categoryId].elements.splice(-1, 1);
		}
		editTree(newTree);
	}

	function addNewThree(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const arr2 = [...tree];

		const _arr = (function recursive(items: Array<Tree>) {
			items.forEach((item: any, index) => {
				if (!item.title.length) {
					items.splice(index, 1);
				}
				for (const key in item) {
					if (Array.isArray(item[key])) {
						recursive(item[key]);
					}
				}
			});
			console.log(items);
			
			return items;
		}([...arr2]));
		setTreeSuccess(tree);
		// setTreeAsync(tree);
	}

	return (
		<form onSubmit={(e: React.FormEvent<HTMLFormElement>) => addNewThree(e)} className={`dashboard__form ${visible ? "dashboard__form_active" : ""}`}>
			{
				tree.map((section: Section, sectionId: number) => (
					<div className="dashboard__form-container" key={sectionId}>
						<div className="dashboard__form-block dashboard__form-block_section">
							<div className="dashboard__form-tools">
								<span className={`dashboard__form-icon dashboard__form-icon_add ${tree.length >= 3 ? "dashboard__form-icon_disabled" : ""}`} onClick={(e: SyntheticEvent) => addElement("section")}></span>
								<span className={`dashboard__form-icon dashboard__form-icon_remove ${tree.length <= 1 ? "dashboard__form-icon_disabled" : ""}`} onClick={(e: SyntheticEvent) => removeElement("section")}></span>
							</div>
    
							<label htmlFor="" className="dashboard__label">
								<input type="text" value={section.title} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => changeElementValue("section", e.currentTarget.value, sectionId)} placeholder="Введите название раздела" />
							</label>
						</div>
						{section.categories.map((category: Category, categoryId: number) => (
							<React.Fragment key={categoryId}>
								<div className="dashboard__form-block dashboard__form-block_category">
									<div className="dashboard__form-tools">
										<span className={`dashboard__form-icon dashboard__form-icon_add ${tree[sectionId].categories.length >= 3 ? "dashboard__form-icon_disabled" : ""}`} onClick={(e: SyntheticEvent) => addElement("category", sectionId)}></span>
										<span className={`dashboard__form-icon dashboard__form-icon_remove ${tree[sectionId].categories.length <= 1 ? "dashboard__form-icon_disabled" : ""}`} onClick={(e: SyntheticEvent) => removeElement("category", sectionId)}></span>
									</div>
									<label htmlFor="" className="dashboard__label">
										<input type="text" value={category.title || ""} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => changeElementValue("category", e.currentTarget.value, sectionId, categoryId)} placeholder="Введите название категории" />
									</label>
								</div>
								{category.elements.map((element: Element, elementId: number) => (
									<div className="dashboard__form-block dashboard__form-block_element" key={elementId}>
										<div className="dashboard__form-tools">
											<span className={`dashboard__form-icon dashboard__form-icon_add ${tree[sectionId].categories[categoryId].elements.length >= 3 ? "dashboard__form-icon_disabled" : ""}`} onClick={(e: SyntheticEvent) => addElement("element", sectionId, categoryId)}></span>
											<span className={`dashboard__form-icon dashboard__form-icon_remove ${tree[sectionId].categories[categoryId].elements.length <= 1 ? "dashboard__form-icon_disabled" : ""}`} onClick={(e: SyntheticEvent) => removeElement("element", sectionId, categoryId)}></span>
										</div>
										<label htmlFor="" className="dashboard__label">
											<input type="text" value={element.title} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => changeElementValue("element", e.currentTarget.value, sectionId, categoryId, elementId)} placeholder="Введите название элемента" />
										</label>
									</div>
								))}
							</React.Fragment>
						))}
					</div>
				))
			}
			<button type="submit" disabled={!tree.every((item) => !!item.title.length) || data.length > 2} className="dashboard__form-submit">Добавить</button>
		</form>
			
	);
};

const mapDispatchToProps = (dispatch: React.Dispatch<Action | Function>) => ({
	setTreeAsync: (tree: Array<Tree>) => {
		dispatch(setTreeAsync(tree));
	},
	setTreeSuccess: (tree: Array<Tree>) => {
		dispatch(setTreeSuccess(tree));
	},
});

export default connect<{}, DispatchProps>(null, mapDispatchToProps)(DashboardForm);
