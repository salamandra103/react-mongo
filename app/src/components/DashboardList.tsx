import React, { SyntheticEvent, useState } from "react";
import { connect } from "react-redux";

import { deleteTreeAsync, editTreeAsync } from "@/store/actions/dashboard";
import { Action } from "../../node_modules/redux/index";

type Props = StateProps & DispatchProps

interface Section {
    title: string,
    categories: Array<Category>,
	_id: string
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

interface StateProps {
	dashboard: Array<Tree>,
}

interface DispatchProps {
	deleteTreeAsync: (id: string) => void,
	editTreeAsync: (tree: Array<Tree>) => void
}

const DashboardList: React.FC<Props> = ({ dashboard, deleteTreeAsync, editTreeAsync }: Props) => {
	const [editActive, setEditActive] = useState(false);
	
	function editCurrentTree(keyName: string, id: string) {
		setEditActive(!editActive);
		// editTreeAsync("section", section._id)
	}

	function changeElementValue(type: string, value: string, sectionId?: number, categoryId?: number, elementId?: number): void {
		let tree: Array<Tree> = [...dashboard];
		if (type === "section") {
			try {
				if (typeof sectionId === "undefined") {
					throw new Error("Отсутствует обязательный параметр sectionId");
				}
				tree = tree.map((item, id) => {
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
				tree = tree.map((item, id) => {
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
				tree = tree.map((item, id) => {
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
		// editTreeAsync(tree);
	}

	return (
		<>
			{ (dashboard && dashboard.length) ? dashboard.map((section: Section, sectionId: number) => (
				<div className="dashboard__section dashboard__item" key={sectionId}>
					<div className="dashboard__item-wrapper">
						{
							!editActive ? (
								<div className="dashboard__section-name">
									<span>{section.title}</span>
								</div>
							) : (
								<label htmlFor="" className="dashboard__label">
									<input type="text" value={section.title} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => changeElementValue("section", e.currentTarget.value, sectionId)} placeholder="Введите название раздела" />
								</label>
							)
						}
						<div className={`dashboard__item-tools ${editActive ? "dashboard__item-tools_editable" : ""}`}>
							<span className="dashboard__item-icon dashboard__item-icon_refresh" onClick={(e: SyntheticEvent) => editCurrentTree("section", section._id)}></span>
							<span className="dashboard__item-icon dashboard__item-icon_save" onClick={(e: SyntheticEvent) => editCurrentTree("section", section._id)}></span>
							<span className="dashboard__item-icon dashboard__item-icon_edit" onClick={(e: SyntheticEvent) => editCurrentTree("section", section._id)}></span>
							<span className="dashboard__item-icon dashboard__item-icon_remove" onClick={(e: SyntheticEvent) => deleteTreeAsync(section._id)}></span>
						</div>
					</div>
					{section.categories.map((category: Category, categoryId: number) => (
						<div className="dashboard__category dashboard__item" key={categoryId}>
							<div className="dashboard__item-wrapper">
								{!editActive ? (
									<div className="dashboard__category-name">
										<span>{category.title}</span>
									</div>
								) : (
									<label htmlFor="" className="dashboard__label">
										<input type="text" value={category.title || ""} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => changeElementValue("category", e.currentTarget.value, sectionId, categoryId)} placeholder="Введите название категории" />
									</label>
								)}
								<div className="dashboard__item-tools">
									<span className="dashboard__item-icon dashboard__item-icon_remove" onClick={(e: SyntheticEvent) => deleteTreeAsync(section._id)}></span>
								</div>
							</div>

							{category.elements.map((element: Element, elementId: number) => (
								<div className="dashboard__element dashboard__item" key={elementId}>
									<div className="dashboard__item-wrapper">
										{!editActive ? (
											<div className="dashboard__element-name">
												<span>{element.title}</span>
											</div>
										) : (
											<label htmlFor="" className="dashboard__label">
												<input type="text" value={element.title} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => changeElementValue("element", e.currentTarget.value, sectionId, categoryId, elementId)} placeholder="Введите название элемента" />
											</label>
										)}
										<div className="dashboard__item-tools">
											<span className="dashboard__item-icon dashboard__item-icon_remove" onClick={(e: SyntheticEvent) => deleteTreeAsync(section._id)}></span>
										</div>
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			)) : null}
		</>
	);
};

const mapStateToProps = (state: StateProps) => ({
	dashboard: state.dashboard,
});

const mapDispatchToProps = (dispatch: React.Dispatch<Action | Function>) => ({
	deleteTreeAsync: (id: string) => {
		dispatch(deleteTreeAsync(id));
	},
	editTreeAsync: (tree: Array<Tree>) => {
		dispatch(editTreeAsync(tree));
	},
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(DashboardList);
