import React, { useEffect } from "react";
import { Provider } from "react-redux";

import Main from "@/layouts/Main";

import store from "./store";

function App() {
	return (
		<Provider store={store}>
			<Main></Main>
		</Provider>
        
	);
}

export default App;
