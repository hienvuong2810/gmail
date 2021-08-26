import React from "react";
import {
	Tabs,
	Row,
	Col,
	Radio,
	Input,
	Checkbox,
	Upload,
	Button,
	notification,
	Tooltip,
} from "antd";
const { TabPane } = Tabs;
import { FileImageFilled, UndoOutlined } from "@ant-design/icons";
import "./css.css";
import { connect } from "react-redux";
import emailValidator from 'email-validator';

class App extends React.Component {
	onChangeOTPSMS(e) {
		this.props.dispatch({
			type: "OTP_SMS_CHOOSE",
			payload: e.target.value,
		});
	}
	onChangeIP(e) {
		this.props.dispatch({
			type: "IP_CHOOSE",
			payload: e.target.value,
		});
	}
	onCheckNotSecure() {
		this.props.dispatch({
			type: "OPEN_NOT_SECURE",
			payload: !this.props.setting.notSecureChecked,
		});
	}

	onCheckOpenIMAP() {
		this.props.dispatch({
			type: "OPEN_IMAP_POP3",
			payload: !this.props.setting.openImapPOP3Checked,
		});
	}

	onChangeOtpAPIKEY(e) {
		this.props.dispatch({
			type: "OTP_SMS_API_KEY",
			payload: e.target.value,
		});
	}

	onChangeSaveProfile() {
		this.props.dispatch({
			type: "SAVE_PROFILE",
		});
	}

	onChangeDeletePhone() {
		this.props.dispatch({
			type: "DELETE_PHONE",
		});
	}

	onChangPasswordDefaultChecked() {
		this.props.dispatch({
			type: "PASSWORD_DEFAULT_CHECKED",
		});
	}

	onChangePassword(e) {
		this.props.dispatch({
			type: "PASSWORD",
			payload: e.target.value,
		});
	}

	onValidatePassword(e) {
		if (e.target.value.length < 8) {
			this.showNotification(
				"Mật khẩu cố định ít nhất 8 ký tự",
				"Mật khẩu cố định chưa đủ 8 ký tự. \r\n" +
					" Vui lòng thêm " +
					`${8 - e.target.value.length}` +
					" ký tự nữa."
			);
			this.props.dispatch({
				type: "PASSWORD",
				payload: "softwaremmo.com",
			});
		}
	}

	showNotification(title, content) {
		notification.warn({
			message: title,
			description: content,
		});
	}

	onChangeMailRecoverChecked() {
		this.props.dispatch({
			type: "ADD_MAIL_RECOVER_CHECKED",
		});
	}

	onChangeMailRecover(e) {
		this.props.dispatch({
			type: "MAIL_RECOVER",
			payload: e.target.value,
		});

	}
	onValidateMailRecover(e){
		if(!emailValidator.validate(e.target.value)){
			this.props.dispatch({
				type: "MAIL_RECOVER",
				payload: "",
			});
			this.showNotification("Email khôi phục", "Email khôi phục không đúng định dạng")
		}
	}
	onChangeAvatar(info) {
		this.props.dispatch({
			type: "SET_AVATAR",
			payload: info.path,
		});
		return false;
	}

	onChangeAvatarChecked() {
		this.props.dispatch({
			type: "AVATAR_CHECKED",
		});
	}

	onChangeDcomName(e) {
		this.props.dispatch({
			type: "DCOM_NAME",
			payload: e.target.value,
		});
	}

	onChangeTinsoft(e) {
		this.props.dispatch({
			type: "TINSOFT",
			payload: e.target.value,
		});
	}
	onClickReloadIP() {
	}

	render() {
		return (
			<TabPane {...this.props}>
				<div style={{ height: "374.6px", width: "100%" }}>
					<Row
						style={{
							boxSizing: "border-box",
							border: "1px dashed",
							borderRadius: "5px",
							padding: "20px",
						}}
					>
						<h1
							style={{
								marginTop: "-35px",
								marginLeft: "5px",
								width: "auto",
								backgroundColor: "white",
								padding: "0 10px 0 10px",
							}}
						>
							Cài đặt OTP SMS
						</h1>
						<Col span={24}>
							<Radio.Group
								onChange={this.onChangeOTPSMS.bind(this)}
								value={this.props.setting.otpChoose}
								style={{
									display: "flex",
									justifyContent: "space-evenly",
								}}
							>
								<Radio value={1}>Otpsim</Radio>
								<Radio value={2}>Chothuesimcode</Radio>
							</Radio.Group>
							<div style={{ marginTop: "25px" }}>
								<Input
									addonBefore="API KEY"
									value={this.props.setting.otpAPIKEY}
									onChange={this.onChangeOtpAPIKEY.bind(this)}
								/>
							</div>
						</Col>
					</Row>

					<Row
						style={{
							boxSizing: "border-box",
							border: "1px dashed",
							borderRadius: "5px",
							padding: "20px",
							marginTop: "20px",
						}}
					>
						<h1
							style={{
								marginTop: "-35px",
								marginLeft: "5px",
								width: "auto",
								backgroundColor: "white",
								padding: "0 10px 0 10px",
							}}
						>
							Cài đặt IP
						</h1>
						<Col span={24}>
							<Radio.Group
								onChange={this.onChangeIP.bind(this)}
								value={this.props.setting.ip.checked}
								style={{
									display: "flex",
									justifyContent: "space-evenly",
								}}
							>
								<Col span={8}>
									<Radio value={1}>Không đổi</Radio>
									<div
										style={{
											marginTop: "25px",
											width: "80%",
										}}
									>
										<Input
											value={
												this.props.setting.ip.ipAddress
											}
											addonBefore="Địa chỉ IP"
											suffix={
												<UndoOutlined
													onClick={this.onClickReloadIP.bind(
														this
													)}
												/>
											}
										/>
									</div>
								</Col>
								<Col span={8}>
									<Radio value={2}>Dcom</Radio>
									<div
										style={{
											marginTop: "25px",
											width: "80% ",
										}}
									>
										<Input
											onChange={this.onChangeDcomName.bind(
												this
											)}
											value={
												this.props.setting.ip.dcomName
											}
											disabled={
												this.props.setting.ip.checked ==
												2
													? false
													: true
											}
											addonBefore="Tên Dcom"
										/>
									</div>
								</Col>
								<Col span={8}>
									<Radio value={3}>TMProxy</Radio>
									<div style={{ marginTop: "25px" }}>
										<Input
											onChange={this.onChangeTinsoft.bind(
												this
											)}
											value={
												this.props.setting.ip.apiTinsoft
											}
											disabled={
												this.props.setting.ip.checked ==
												3
													? false
													: true
											}
											addonBefore="API KEY"
										/>
									</div>
								</Col>
							</Radio.Group>
						</Col>
					</Row>

					<Row
						style={{
							boxSizing: "border-box",
							border: "1px dashed",
							borderRadius: "5px",
							padding: "20px 20px 17px 20px",
							marginTop: "20px",
							justifyContent: "space-between",
						}}
					>
						<Col span={4.8}>
							<h1
								style={{
									marginTop: "-35px",
									marginLeft: "5px",
									width: "fit-content",
									backgroundColor: "white",
									padding: "0 10px 0 10px",
								}}
							>
								Cài đặt Gmail
							</h1>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Checkbox
									checked={
										this.props.setting.notSecureChecked
									}
									onChange={this.onCheckNotSecure.bind(this)}
								>
									Bật không an toàn
								</Checkbox>

								{/* <Checkbox
									checked={
										this.props.setting.openImapPOP3Checked
									}
									onChange={this.onCheckOpenIMAP.bind(this)}
									style={{
										marginTop: "9px",
										marginLeft: "0px",
									}}
								>
									Bật IMAP/POP3
								</Checkbox> */}
							</div>
						</Col>

						<Col span={4.8}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Checkbox
									checked={
										this.props.setting.saveProfileChecked
									}
									onChange={this.onChangeSaveProfile.bind(
										this
									)}
								>
									Lưu Profile
								</Checkbox>
								<Checkbox
									checked={
										this.props.setting.deletePhoneChecked
									}
									onChange={this.onChangeDeletePhone.bind(
										this
									)}
									style={{
										marginTop: "9px",
										marginLeft: "0px",
									}}
								>
									Xóa số điện thoại
								</Checkbox>
							</div>
						</Col>

						<Col span={4.8}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Checkbox
									onChange={this.onChangPasswordDefaultChecked.bind(
										this
									)}
									checked={
										this.props.setting
											.passwordDefaultChecked
									}
								>
									Mật khẩu cố định
								</Checkbox>
								<Input
									onChange={this.onChangePassword.bind(this)}
									disabled={
										!this.props.setting
											.passwordDefaultChecked
									}
									onBlur={this.onValidatePassword.bind(this)}
									value={this.props.setting.password}
									placeholder={this.props.setting.password}
								></Input>
							</div>
						</Col>

						<Col span={4.8}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Checkbox
									onChange={this.onChangeMailRecoverChecked.bind(
										this
									)}
									checked={
										this.props.setting.mailRecoverChecked
									}
								>
									Thêm mail khôi phục:
								</Checkbox>
								<Input
									type='email'
									disabled={
										!this.props.setting.mailRecoverChecked
									}
									onChange={this.onChangeMailRecover.bind(this)}
									onBlur={this.onValidateMailRecover.bind(this)}
									value={this.props.setting.mailRecover}
								></Input>
							</div>
						</Col>

						{/* <Col span={4.8}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Checkbox
									onChange={this.onChangeAvatarChecked.bind(
										this
									)}
									checked={this.props.setting.avatar.checked}
								>
									<Upload
										maxCount={1}
										accept="image/png, image/jpeg"
										beforeUpload={this.onChangeAvatar.bind(
											this
										)}
									>
										<Button
											disabled={
												!this.props.setting.avatar
													.checked
											}
										>
											<FileImageFilled /> Chon file avatar
										</Button>
									</Upload>
								</Checkbox>
							</div>
						</Col> */}
					</Row>
				</div>
			</TabPane>
		);
	}
}
function mapStateToProps(state) {
	return {
		setting: state.createGmailTab,
	};
}

export default connect(mapStateToProps)(App);
