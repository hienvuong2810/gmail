import React from "react";
import { PageHeader, Tabs, Button, Badge, Tag } from "antd";
import { UserOutlined, FieldTimeOutlined } from "@ant-design/icons";
import "./css.css";
import { connect } from "react-redux";
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
						<span style={{ margin: "10px" }}> Mã sản phẩm: {this.props.data.key}</span>
						<Badge
							style={{ paddingBottom: "5px" }}
							status="success"
						/>
					</>
				}
				tags={<Tag color="blue"><b>{this.props.data.version}</b></Tag>}
				subTitle={
					<>
						<FieldTimeOutlined />
						<span style={{ marginLeft: "10px" }}><b>Hạn dùng: {this.props.data.expired}</b></span>
					</>
				}
				extra={[
					<Button key="3">Thông báo</Button>,
					<Button key="2">Cập nhật</Button>,
				]}
			></PageHeader>
		);
	}
}
function mapStateToProps(state) {
	return {
		data: state.data,
	};
}

export default connect(mapStateToProps)(Headers);

