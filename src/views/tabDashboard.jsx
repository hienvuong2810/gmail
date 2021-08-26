import React, { useEffect } from "react";
import { Tabs, Table } from "antd";
import "./css.css";
const { Column, ColumnGroup } = Table;
import { connect } from "react-redux";
const { TabPane } = Tabs;
const { ipcRenderer } = require("electron");
import { Noti } from "./actions/dashboardTabAction";
ipcRenderer.on("err", (event, data) => {
	Noti(data);
});

const Dashboard = (props) => {
	const columns = [
		{
			title: "Gmail",
			dataIndex: "gmail",
			key: "gmail",
			ellipsis: true,
			width: "30%",
			editable: true,
		},
		{
			title: "Password",
			dataIndex: "password",
			key: "password",
			ellipsis: true,
			editable: true,
			width: "30%",
		},
		{
			title: "Mail Recover",
			dataIndex: "recover",
			key: "recover",
			ellipsis: true,
			editable: true,
			width: "30%",
		},
		{
			title: "Profile",
			dataIndex: "profile",
			key: "profile",
			ellipsis: true,
			width: "10%",
			render: (text, record, index) => (
				<a
					onClick={() => {
						ipcRenderer.send("open", record.key);
					}}
					id={record.key}
				>
					Open
				</a>
			),
		},
	];
	return (
		<TabPane {...props}>
			<Table
				dataSource={props.dashBoard.listMail}
				columns={columns}
				scroll={{ y: 340 }}
				size="small"
				pagination={false}
				bordered
				expandable={{
					columnWidth: 100,
				}}
			/>
		</TabPane>
	);
};

function mapStateToProps(state) {
	return {
		dashBoard: state.dashboardTab,
	};
}
export default connect(mapStateToProps)(Dashboard);
