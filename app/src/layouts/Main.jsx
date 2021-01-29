import React, { useEffect, useState } from "react";
import {
	BrowserRouter, Route, Switch, NavLink,
} from "react-router-dom";

import {connect} from 'react-redux';


import API from "@/utils/api";

import Register from '@/screens/Register';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Main = ({user}) => {
	const [list, setList] = useState([]);
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	useEffect(() => {
		(async() => {
			const { data } = await API.get("http://localhost:3001/api/");
			setList(data);
		})();
	}, []);
    
	async function setNewUser(name, age) {
		if (name.length && age.length) {
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
			<Header/>
			<main class="page__main">
				<BrowserRouter basename="/">
					<Switch>
						<Route exact path="/">
							{!user ? <Register/> : <div>Авторизован</div>}
						</Route>
					</Switch>
				</BrowserRouter>
			</main>
			<Footer/>
		</div>
	);
}

export default connect((state) => {
	return {
		user: state.user
	}
})(Main);
