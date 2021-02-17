import React from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import store from "./store";

type Props = {};

let App: React.FC<Props> = () => (
	<BrowserRouter basename="/">
		<MainLayout />
	</BrowserRouter>
);

App = connect(null, null)(App);

const AppWithStore: React.FC = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default AppWithStore;
