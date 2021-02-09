import React from "react";
import { connect } from "react-redux";

interface Props {
    data: Array<Tree>,
}

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

const DashboardList: React.FC<Props> = ({ data }: Props) => (
	<>
		{ (data && data.length) ? data.map((section: Section, sectionId: number) => (
			<div className="dashboard__section" key={sectionId}>
				<span className="dashboard__section-name">{section.title}</span>
				{section.categories.map((category: Category, categoryId: number) => (
					<div className="dashboard__category" key={categoryId}>
						<span className="dashboard__category-name">{category.title}</span>
						{category.elements.map((element: Element, elementId: number) => (
							<div className="dashboard__element" key={elementId}>{element.title}</div>
						))}
					</div>
				))}
			</div>
		)) : null}
	</>
);

export default DashboardList;
