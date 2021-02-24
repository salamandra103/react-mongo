import React, {
	Dispatch, SyntheticEvent, useState, useEffect,
} from "react";
import { connect } from "react-redux";

import { getTreeAsync } from "@/store/actions/dashboard";

import DashboardList from "@/components/DashboardList";
import DashboardForm from "@/components/DashboardForm";

import { Action } from "../../node_modules/redux/index";

type Props = StateProps & DispatchProps

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

interface DispatchProps {
	getTreeAsync: () => void
}

const Dashboard: React.FC<Props> = ({ dashboard, getTreeAsync }: Props) => {
	const [isActiveForm, setActiveForm] = useState(true);

	useEffect(() => {
		getTreeAsync();
	}, []);

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
							<DashboardList />
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

const mapDispatchToProps = (dispatch: React.Dispatch<Action | Function>) => ({
	getTreeAsync: () => {
		dispatch(getTreeAsync());
	},
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Dashboard);
