import React from "react";
import { Progress, Card, Col, Row, Typography } from "antd";
import Image from "./image.jsx";
import "../css.css"
const { ipcRenderer } = require("electron");
export default class Splash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  percent: 0
		}
	  }
	async componentDidMount(){
		ipcRenderer.invoke('init')
	}
	render() {
		return (
			<div>
				<Row>
					<Col style={{ margin: "auto" }}>
						<h1
							style={{
								fontWeight: "400",
								fontSize: "38px",
								lineHeight: "46px",
							}}
						>
							TOOL REGISTER GMAIL
						</h1>
						<p
							style={{
								fontSize: "20px",
								lineHeight: "28px",
								color: "rgba(0,0,0,.43)",
							}}
						>
							{" "}
							&#10003; Tool tự động đăng ký tài khoản Gmail
						</p>
						<p
							style={{
								fontSize: "20px",
								lineHeight: "28px",
								color: "rgba(0,0,0,.43)",
							}}
						>
							&#10003; Lưu profile cho từng tài khoản
						</p>
						<p
							style={{
								fontSize: "20px",
								lineHeight: "28px",
								color: "rgba(0,0,0,.43)",
							}}
						>
							&#10003; Bật IMAP/POP3
						</p>
						<p
							style={{
								fontSize: "20px",
								lineHeight: "28px",
								color: "rgba(0,0,0,.43)",
							}}
						>
							&#10003; Thêm mail khôi phục
						</p>
						<p
							style={{
								fontSize: "20px",
								lineHeight: "28px",
								color: "rgba(0,0,0,.43)",
							}}
						>
							&#10003; Thêm avatar, cùng nhiều tính năng khác
						</p>
						<p
							style={{
								fontSize: "20px",
								lineHeight: "28px",
								color: "rgba(0,0,0,.43)",
							}}
						>
							&#10003; Hỗ trợ cập nhật phiên bản mới
						</p>
					</Col>
					<Col>
						<Image />
					</Col>
				</Row>
				<Row style={{ padding: "0 90px" }}>
					Đang bật tool
					<Progress percent={this.percent} />
				</Row>
			</div>
		);
	}
}
