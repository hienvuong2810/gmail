import React from "react";
import { PageHeader, Tabs, Button, Badge, Tag } from "antd";
import { UserOutlined, FieldTimeOutlined } from "@ant-design/icons";
import "./css.css";
class Headers extends React.Component {
	render() {
		return (
			<PageHeader
				style={{ backgroundColor: "white" }}
				avatar={{
					src: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png",
				}}
				title={
					<>
						<UserOutlined />
						<span style={{ margin: "10px" }}>hienvuong2810</span>
						<Badge
							style={{ paddingBottom: "5px" }}
							status="success"
						/>
					</>
				}
				tags={<Tag color="blue">TRIAL</Tag>}
				subTitle={
					<>
						<FieldTimeOutlined />
						<span style={{ marginLeft: "10px" }}>17/10/2021</span>
					</>
				}
				extra={[
					<Button key="3">Thông báo</Button>,
					<Button key="2">Cập nhật</Button>,
					<Button key="1" type="primary">
						Đăng xuất
					</Button>,
				]}
			></PageHeader>
		);
	}
}

export default Headers;
