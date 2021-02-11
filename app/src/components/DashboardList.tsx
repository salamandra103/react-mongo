import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";

import { deleteTreeAsync } from "@/store/actions/dashboard";
import { Action } from "../../node_modules/redux/index";

type Props = {
    data: Array<Tree>,
} & DispatchProps

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

interface DispatchProps {
	deleteTreeAsync: (id: string) => void
}

const DashboardList: React.FC<Props> = ({ data, deleteTreeAsync }: Props) => (
	<>
		{ (data && data.length) ? data.map((section: Section, sectionId: number) => (
			<div className="dashboard__section dashboard__item" key={sectionId}>
				<span className="dashboard__item-delete" onClick={(e: SyntheticEvent) => deleteTreeAsync(section._id)}></span>
				<span className="dashboard__section-name">{section.title}</span>
				{section.categories.map((category: Category, categoryId: number) => (
					<div className="dashboard__category dashboard__item" key={categoryId}>
						<span className="dashboard__category-name">{category.title}</span>
						{category.elements.map((element: Element, elementId: number) => (
							<div className="dashboard__element dashboard__item" key={elementId}>{element.title}</div>
						))}
					</div>
				))}
			</div>
		)) : null}
	</>
);

const mapDispatchToProps = (dispatch: React.Dispatch<Action | Function>) => ({
	deleteTreeAsync: (id: string) => {
		dispatch(deleteTreeAsync(id));
	},
});

export default connect<{}, DispatchProps>(null, mapDispatchToProps)(DashboardList);
