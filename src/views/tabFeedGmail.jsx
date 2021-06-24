import React from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;

export default class Dashboard extends React.Component {
	render() {
		return <TabPane {...this.props}>Feed Gmail</TabPane>;
	}
}
