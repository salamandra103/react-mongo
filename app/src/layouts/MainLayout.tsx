import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, NavLink, Redirect, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { connect } from 'react-redux';

import API from "@/utils/api";

import AuthLayout from '@/layouts/AuthLayout';

import Register from '@/screens/Register';
import Login from '@/screens/Login';
import Profile from '@/screens/Profile';

import PrivateComponent from '@/components/PrivateComponent';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
	user: Object
}

const Main: React.FC<Props> = ({ user }) => {
	const [name, setName] = useState<string>("");
	const [age, setAge] = useState<number>(null);

	const location = useLocation();

	return (
		<div className='page'>
			<Header />
			<main className="page__main">
				<TransitionGroup component={null}>
					<CSSTransition
						key={location.key}
						classNames="slide"
						timeout={10000}
					>
						<Switch location={location}>
							<Route>
								<AuthLayout>
									<Switch>
										<PrivateComponent path='/login' isAuth={!user} redirectPath="/" component={Login}></PrivateComponent>
										<PrivateComponent path='/signup' isAuth={!user} redirectPath="/" component={Register}></PrivateComponent>
									</Switch>
								</AuthLayout>
							</Route>
							<PrivateComponent exact isAuth={user} path="/" redirectPath="/login" component={Profile} />
							<Route path='*'>
								<h1>404</h1>
							</Route>
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			</main>
			{/* <Footer /> */}
		</div >
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
