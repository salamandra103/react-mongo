import React, { useEffect } from "react";
import { Provider } from "react-redux";

import Main from "@/layouts/Main";

import store from "./store";

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Main></Main>
		</Provider>

	);
}

export default App;
