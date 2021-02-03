import React from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import store from "./store";

interface Props {
	user?: Object
}

let App: React.FC<Props> = ({ user }) => {
	return (
		<BrowserRouter basename="/">
			<MainLayout />
		</BrowserRouter>
	)
}

interface State {
	user: Object
}

App = connect((state: State) => {
	return {
		user: state.user
	}
})(App);

const AppWithStore: React.FC = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}



export default AppWithStore;
