import React from "react";
import { Progress, Col, Row } from "antd";
import Image from "./image.jsx";
import "../css.css"
import { connect } from "react-redux";
const { ipcRenderer } = require("electron");

class Splash extends React.Component {
	async componentDidMount(){
		await ipcRenderer.invoke('init')
		let data = await Promise.all([
			this.tick(),
			ipcRenderer.invoke('key'),
			fetch('http://localhost:6969/version').then(result => result.json())
		])
		
		this.props.dispatch({
			type: "KEY",
			payload: data[1].key
		})
		this.props.dispatch({
			type: "EXPRIED",
			payload: data[1].expired
		})
		if(data[2].version === "1.0.0"){
			this.props.dispatch({
				type: "STATE",
				payload: 1
			})
		}else{
			this.props.dispatch({
				type: "NOTI_VERSION",
				payload: "Vui lòng cập nhật phiên bản mới nhất tại trang chủ."
			})
		}
		
	}
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	  }
	async tick() {
		for (let i = 0; i < 100; i++){
			this.props.dispatch({
				type: "PERCENT",
				payload: this.props.x.percent + 1
			})
			await this.sleep(20)
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
							&#10003; Tỉ lệ live cực cao
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
							&#10003; Đổi IP sau mỗi lần đăng ký
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
					{this.props.x.notiVersion}
					<Progress percent={this.props.x.percent} />
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		x: state.data,
	};
}

export default connect(mapStateToProps)(Splash);