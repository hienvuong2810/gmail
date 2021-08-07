import React from "react";
import { Tabs, Card, Col, Row, Typography  } from "antd";
const { TabPane } = Tabs;
const { Paragraph, Text } = Typography;
export default class Dashboard extends React.Component {
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
						Chuyển khoản qua số tài khoản ngân hàng hoặc qua ví Momo với nội dung:  
						<Text strong mark copyable> RG HEUOHGUWO</Text>
					</Paragraph>
					<Row gutter={24}>
						<Col span={12}>
							<div className="atm-tech">
								<span className="logo-tech"></span>
								<b className="atm-number">1900 1900 1900 1900</b>
								<b className="atm-name">PHAN THAI HIEN VUONG</b>
							</div>	
						</Col>
						<Col span={12}>
							<div className="atm-momo">
								<span className="logo-momo"></span>
								<b className="atm-number">087 888 9951</b>
								<b className="atm-name">PHAN THAI HIEN VUONG</b>
							</div>	
						</Col>
					</Row>

				</div>
			</TabPane>
		);
	}
}
