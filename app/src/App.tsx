import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import store from "./store";

const unsubscribe = store.subscribe(() => {
	console.log(1);
	console.log(store.getState());

})
unsubscribe();

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter basename="/">
				<MainLayout />
				{store.getState().user ? <div>auth</div> : <div>unauth</div>}
			</BrowserRouter>
		</Provider>
	);
}

export default App;
