import React from "react";
import { Tabs, Card, Col, Row, Typography  } from "antd";
const { TabPane } = Tabs;
const { Paragraph, Text } = Typography;
import { BugOutlined } from "@ant-design/icons";
import { shell } from "electron"; 
import { Icon } from "@material-ui/core";
import { connect } from "react-redux";
class Dashboard extends React.Component {
	openBrowser(id){
		if(id === 1)
		shell.openExternal("https://www.facebook.com/toolmailmmo")
		else if(id === 2)
		shell.openExternal("https://t.me/phanvuong28")
		else if(id === 3)
		shell.openExternal("https://forms.gle/Kngd5EDqSWrXbcST8")
	}
	render() {
		return (
			<TabPane {...this.props}>
				<div>
					<b>Giá sản phẩm</b>
					<hr></hr>
					<Row gutter={24} style={{padding: '5px'}}>
						<Col span={8} >
							<Card
								title="1 Tháng"
								hoverable
								size='small'
								headStyle={{ textAlign: "center", backgroundColor: '#91d5ff'}}
								bodyStyle={{ textAlign: "center" }}
							>
								<b>350.000</b>
							</Card>
						</Col>
						<Col span={8}>
							<Card
								title="6 Tháng"
								hoverable
								size='small'
								headStyle={{ textAlign: "center", backgroundColor: '#91d5ff' }}
								bodyStyle={{ textAlign: "center" }}
							>
								<b> 1.800.000</b>
							</Card>
						</Col>
						<Col span={8}>
							<Card
								title="1 Năm"
								hoverable
								size='small'
								headStyle={{ textAlign: "center", backgroundColor: '#91d5ff'}}
								bodyStyle={{ textAlign: "center" }}
							>
								<b>3.000.000</b>
							</Card>
						</Col>
					</Row>
					
				</div>
				<div>
					<b>Phương thức thanh toán</b>
					<hr></hr>
					<Paragraph> 
						Chuyển khoản qua số tài khoản ngân hàng với nội dung:  
						<Text strong mark copyable> RG {this.props.data.key}</Text> &nbsp;
						      Sau 5 phút chưa được kích hoạt key, vui lòng liên hệ fanpage hoặc telegram
					</Paragraph>
					<Row style={{display: 'flex', justifyContent:'center'}}>
						{/* <Col   */}
							<div className="atm-tech">
								<span className="logo-tech"></span>
								<Text className="atm-number" strong copyable>1903 6573 616011</Text>
								<b className="atm-name">PHAN THAI HIEN VUONG</b>
							</div>	
						{/* </Col> */}
						{/* <Col span={12} style={{display: 'flex', justifyContent:'center'}}>
							<div className="atm-momo">
								<span className="logo-momo"></span>
								<Text className="atm-number" strong copyable>087 888 9951</Text>
								<b className="atm-name">PHAN THAI HIEN VUONG</b>
							</div>	
						</Col> */}
					</Row>
				</div>
				<div>
					<b>Liên hệ</b>
					<hr></hr>
					<Row gutter={24}>
						<Col span={8}>
							<div className="contact">
								<div className="logo-facebook" onClick={this.openBrowser.bind(this, 1)}> <a className="link">facebook.com/toolmailmmo</a></div>
								
							</div>
						</Col>
						<Col span={8}>
							<div className="contact">
								<div className="logo-telegram" onClick={this.openBrowser.bind(this, 2)}> <a className="link">https://t.me/phanvuong28</a></div>
								
							</div>
						</Col>
						<Col span={8}>
							<div className="require" style={{padding: '15px', cursor: 'pointer'}} onClick={this.openBrowser.bind(this, 3)}>
								<BugOutlined style={{fontSize:'20px'}} />
								<a>  Báo lỗi/Yêu cầu tính năng</a>
							</div>
						</Col>
					</Row>
					{/* <Row>
						<Col>
							
						</Col>
					</Row> */}
				</div>
			</TabPane>
		);
	}
}
function mapStateToProps(state) {
	return {
		data: state.data,
	};
}

export default connect(mapStateToProps)(Dashboard);
