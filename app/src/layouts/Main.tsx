import React, { useEffect, useState } from "react";
import {
	BrowserRouter, Route, Switch, NavLink, Redirect
} from "react-router-dom";

import { connect } from 'react-redux';


import API from "@/utils/api";

import Register from '@/screens/Register';
import Login from '@/screens/Login';
import Home from '@/screens/Home';

import PrivateComponent from '@/components/PrivateComponent';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
	user: Object
}

const Main: React.FC<Props> = ({ user }) => {
	const [name, setName] = useState<string>("");
	const [age, setAge] = useState<number>(null);

	return (
		<div className='page'>
			{user ? <Header /> : null}
			<main className="page__main">
				<BrowserRouter basename="/">
					<Switch>
						<PrivateComponent path='/login' isAuth={!user} redirectPath="/" component={Login}></PrivateComponent>
						<PrivateComponent path='/signup' isAuth={!user} redirectPath="/" component={Register}></PrivateComponent>
						<PrivateComponent exact isAuth={user} path="/" redirectPath="/login" component={Home} />
						<Route path='*'>
							<h1>404</h1>
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
