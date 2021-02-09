import React, { Component } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { connect } from "react-redux";

interface Props extends RouteProps {
	isAuth: boolean,
	redirectPath: string,
}

const PrivateComponent: React.FC<Props> = ({
	component: Component = null, isAuth, redirectPath, ...routeProps
}: Props) => (
	<Route {...routeProps}
		render={(props) => (isAuth ? (
			<Component {...props} />
		) : (
			<Redirect to={{
				pathname: redirectPath,
				state: { from: props.location },
			}} />
		))} />
);

export default PrivateComponent;
