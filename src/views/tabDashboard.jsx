import React, { useState } from "react";
import { Tabs, Table } from "antd";
import "./css.css";
const { Column, ColumnGroup } = Table;

const { TabPane } = Tabs;
const dataSource = [
	{
		key: "1",
		name: "hienvuong2810@gmail.com",
		age: "heusoghiesohg",
		address: "10 Downing Street",
	},
	{
		key: "2",
		name: "hienvuong2810@gmail.com",
		age: "heusoghiesohg",
		address: "10 Downing Street",
	},
	{
		key: "3",
		name: "hienvuong2810@gmail.com",
		age: "heusoghiesohg",
		address: "10 Downing Street",
	},
	{
		key: "4",
		name: "hienvuong2810@gmail.com",
		age: 42,
		address: "10 Downing Street",
	},
	{
		key: "5",
		name: "hienvuong2810@gmail.com",
		age: 32,
		address: "10 Downing Street",
	},
	{
		key: "6",
		name: "hienvuong2810@gmail.com",
		age: 42,
		address: "10 Downing Street",
	},
	{
		key: "7",
		name: "hienvuong2810@gmail.com",
		age: 32,
		address: "10 Downing Street",
	},
	{
		key: "8",
		name: "hienvuong2810@gmail.com",
		age: 42,
		address: "10 Downing Street",
	},
	{
		key: "9",
		name: "Mike",
		age: 32,
		address: "10 Downing Street",
	},
	{
		key: "10",
		name: "John",
		age: 42,
		address: "10 Downing Street",
	},
	{
		key: "11",
		name: "Mike",
		age: 32,
		address: "10 Downing Street",
	},
	{
		key: "12",
		name: "John",
		age: 42,
		address: "10 Downing Street",
	},
	{
		key: "13",
		name: "Mike",
		age: 32,
		address: "10 Downing Street",
	},
	{
		key: "14",
		name: "John",
		age: 42,
		address: "10 Downing Street",
	},
	{
		key: "15",
		name: "Mike",
		age: 32,
		address: "10 Downing Street",
	},
	{
		key: "16",
		name: "John",
		age: 42,
		address: "10 Downing Street",
	},
];
	
const columns = [
	{
		title: "Gmail",
		dataIndex: "name",
		key: "name",
		ellipsis: true,
		width: "40%",
		editable: true,
	},
	{
		title: "Password",
		dataIndex: "age",
		key: "age",
		ellipsis: true,
		editable: true,
		width: "40%",
	},
	{
		title: "Profile",
		dataIndex: "address",
		key: "address",
		ellipsis: true,
		width: "20%",
		render: (text, record, index) => (
			<div>
				<a>Open profile {index}</a>
			</div>
		),
	},
];

const Dashboard = (props) => {
	const [selectionType, setSelectionType] = useState("checkbox");
	return (
		<TabPane {...props}>
			<Table
				dataSource={dataSource}
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
export default Dashboard;
