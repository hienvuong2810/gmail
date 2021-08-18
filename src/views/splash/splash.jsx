import React from "react";
import { Progress, Col, Row } from "antd";
import Image from "./image.jsx";
import "../css.css"
import { connect } from "react-redux";
const { ipcRenderer } = require("electron");

class Splash extends React.Component {
	async componentDidMount(){
		// setInterval(() => {
		// 	this.tick()
		// }, 50)
		await ipcRenderer.invoke('init')
		let data = await ipcRenderer.invoke('key')
		this.props.dispatch({
			type: "KEY",
			payload: data.key
		})
		this.props.dispatch({
			type: "EXPRIED",
			payload: data.exp
		})
		this.props.dispatch({
			type: "STATE",
			payload: 1
		})		
	}
	tick() {
		if (this.props.x.percent <= 100){
			this.props.dispatch({
				type: "PERCENT",
				payload: this.props.x.percent + 1
			})
		}
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
					<Progress percent={this.props.x.percent} />
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		x: state.data,
	};
}

export default connect(mapStateToProps)(Splash);