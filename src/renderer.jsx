const { ipcRenderer } = require("electron");

import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Layout, Tabs, Divider } from "antd";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./views/store";
import logger from "redux-logger";
import {initData} from "./views/actions/dashboardTabAction.js"
import Headers from "./views/headers.jsx";
import Dashboard from "./views/tabDashboard.jsx";
import CreateGmail from "./views/tabCreateGmail.jsx";
import FeedGmail from "./views/tabFeedGmail.jsx";
import Contact from "./views/tabContact.jsx";
import Footers from "./views/footer.jsx";
const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;
import Splash from "./views/splash/splash.jsx"

const init = async () => {
	await store.dispatch(initData())
	if(true){
		ReactDOM.render(<Splash/>,document.getElementById("root") );
	}
	if(false){
		ReactDOM.render(
			<Provider store={store}>
				<Layout>
					<Headers />
					<Layout style={{ padding: "0.8rem", backgroundColor: "white" }}>
						<Content>
							<Tabs
								defaultActiveKey="4"
								size="large"
								type="card"
								centered
								style={{ width: "100%" }}
							>
								<Dashboard tab="Dashboard" key="1" />
								<CreateGmail tab="Setting Create Gmail" key="2" />
								{/* <FeedGmail tab="Setting Feed Gmail" key="3"/> */}
								<Contact tab="Contact" key="4" />
							</Tabs>
						</Content>
					</Layout>
					<Footers />
				</Layout>
			</Provider>,
			document.getElementById("root")
		);
	}
}
 
init()