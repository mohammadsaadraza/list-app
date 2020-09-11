import React from "react";
import { Router, Route } from "react-router-dom";

import history from "../utils/history";
import ListName from "./ListName";
import List from "./List";

const App = () => {
	return (
		<Router history={history}>
			<Route path="/" exact component={ListName}></Route>

			<Route path="/:list" exact component={List}></Route>
		</Router>
	);
};

export default App;
