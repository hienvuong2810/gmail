import React from "react";
import { Row, Col, Typography, Button, Descriptions, InputNumber } from "antd";
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { ipcRenderer } from "electron";
const { Text, Title } = Typography;

class Footer extends React.Component {
	onClickStart() {
		ipcRenderer.send("click");
		this.props.dispatch({ type: "START" });
	}
	onClickPause() {
		ipcRenderer.send("stop");
		this.props.dispatch({ type: "STOP" });
	}
	onChangeThread(value) {
		this.props.dispatch({ type: "THREADS", payload: value });
	}
	render() {
		return (
			<Row style={{ padding: "0.8rem", position:"fixed", bottom: "0", backgroundColor: "#EBECF0" }}>
				<Col
					span={8}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div style={{ float: "left", textAlign: "right" }}>
						{/* <Title type="success" level={4}>
							Tổng số mail:
						</Title> */}
					</div>
					<div
						style={{
							float: "left",
							marginBottom: "0.5rem",
							fontSize: "20px",
							lineHeight: "1.5",
							paddingLeft: "20px",
						}}
					>
						{/* <Text type="success" style={{ marginBottom: "0.5rem" }}>
							{this.props.footer.registerSuccess}
						</Text> */}
					</div>
				</Col>
				<Col span={8}>
					<Descriptions style={{ float: "left" }}>
						<Descriptions.Item
							labelStyle={{ marginTop: "5px" }}
							label="Số luồng"
						>
							<InputNumber
								min={1}
								max={10}
								value={this.props.footer.threads}
								onChange={this.onChangeThread.bind(this)}
							/>
						</Descriptions.Item>
					</Descriptions>
				</Col>
				<Col span={8} style={{ width: "50%" }}>
					<Button
						disabled={!this.props.footer.buttonStartEnable}
						size={"large"}
						icon={<PlayCircleFilled />}
						style={
							this.props.footer.buttonStartEnable
								? {
										width: "75%",
										color: "#4CAF50",
										borderColor: "#4CAF50",
								  }
								: { width: "75%" }
						}
						onClick={this.onClickStart.bind(this)}
					>
						START
					</Button>
					<Button
						disabled={!this.props.footer.buttonPauseEnable}
						size={"large"}
						danger
						icon={<PauseCircleFilled />}
						style={{ marginTop: "1.2em", width: "75%" }}
						onClick={this.onClickPause.bind(this)}
					>
						{" "}
						PAUSE
					</Button>
				</Col>
				{/* //<Col style={{backgroundColor:"blue"}} span={6}>col-6</Col> */}
			</Row>
		);
	}
}

function mapStateToProps(state) {
	return {
		footer: state.footer,
	};
}
export default connect(mapStateToProps)(Footer);
