const { ipcRenderer } = require("electron");

import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./views/store";
import logger from "redux-logger";
import { initData, update, Noti } from "./views/actions/dashboardTabAction.js";
import Main from "./views/mainScreen.jsx"




ipcRenderer.on("update", (event, data) => {
	store.dispatch(update(data));
});

const init = async () => {
	await store.dispatch(initData());
	ReactDOM.render(
		<Provider store={store}>
			<Main />
		</Provider>,
		document.getElementById("root")
	);
};

init();
