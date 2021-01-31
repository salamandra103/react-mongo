import React, { useEffect, useState } from "react";
import {
	BrowserRouter, Route, Switch, NavLink,
} from "react-router-dom";

import { connect } from 'react-redux';


import API from "@/utils/api";

import Register from '@/screens/Register';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
	user: Object
}

const Main: React.FC<Props> = ({ user }) => {
	const [list, setList] = useState<Array<Object>>([]);
	const [name, setName] = useState<string>("");
	const [age, setAge] = useState<number>(null);

	useEffect(() => {
		(async () => {
			const { data } = await API.get("http://localhost:3001/api/");
			setList(data);
		})();
	}, []);

	async function setNewUser(name: String, age: Number) {
		if (name.length && age) {
			await API.post("http://localhost:3001/api/", {
				id: list.length + 1,
				name,
				age,
			});
		}
	}

	return (
		<div className={
			!user ? 'page page_unauth' : 'page'
		}>
			{user ? <Header /> : null}
			<main className="page__main">
				<BrowserRouter basename="/">
					<Switch>
						<Route exact path="/">
							{!user ? <Register /> : <div>Авторизован</div>}
						</Route>
					</Switch>
				</BrowserRouter>
			</main>
			{user ? <Footer /> : null}
		</div>
	);
}

interface State {
	user: Object
}

export default connect((state: State) => {
	return {
		user: state.user
	}
})(Main);
