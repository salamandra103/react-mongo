import React, { Dispatch, SyntheticEvent, useState } from "react";
import { connect } from "react-redux";

import DashboardList from "@/components/DashboardList";
import DashboardForm from "@/components/DashboardForm";
import { Action } from "../../node_modules/redux/index";

type Props = StateProps

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

interface StateProps {
	dashboard: Array<Tree>,
}

const Dashboard: React.FC<Props> = ({ dashboard }: Props) => {
	const [isActiveForm, setActiveForm] = useState(true);

	return (
		<section className="dashboard">
			<div className="dashboard__wrapper">
				<div className="dashboard__container container">
					<nav className="dashboard__nav">
						<ul className="dashboard__nav-list">
							<li className="dashboard__nav-item">
								<button type="button" className="dashboard__nav-btn" onClick={(e: React.FormEvent<HTMLButtonElement>) => setActiveForm(!isActiveForm)}>Добавить новую структуру</button>
							</li>
						</ul>
					</nav>
					<div className="dashboard__block">
						<DashboardForm visible={isActiveForm} data={dashboard} />
						<div className={`dashboard__grid ${isActiveForm ? "dashboard__grid_active" : ""}`}>
							<DashboardList data={dashboard} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const mapStateToProps = (state: StateProps) => ({
	dashboard: state.dashboard,
});

export default connect<StateProps>(mapStateToProps)(Dashboard);
