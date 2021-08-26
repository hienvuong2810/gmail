import React from "react";
import Splash from "./splash/splash.jsx";
import Headers from "./headers.jsx";
import Dashboard from "./tabDashboard.jsx";
import CreateGmail from "./tabCreateGmail.jsx";
import { Layout, Tabs, Divider } from "antd";
import Contact from "./tabContact.jsx";
import Footers from "./footer.jsx";
const { TabPane } = Tabs;
const { Header, Footer, Content } = Layout;
import { connect } from "react-redux";
class Main extends React.Component {
	render() {
		return this.props.data.state === 0 ?
        (
            <Splash/>
        ) 
        : 
        (				
            <Layout>
                <Headers />
                <Layout style={{ padding: "0.8rem", backgroundColor: "white" }}>
                    <Content>
                        <Tabs
                            defaultActiveKey="1"
                            size="large"
                            type="card"
                            centered
                            style={{ width: "100%" }}
                        >
                            <Dashboard tab="Dashboard" key="1" />
                            <CreateGmail tab="Setting Create Gmail" key="2" />
                            {/* <FeedGmail tab="Setting Feed Gmail" key="3"/> */}
                            <Contact tab="Contact" key="4" />
                        </Tabs>
                    </Content>
                </Layout>
                <Footers />
            </Layout>
        );
	}
}
const mapStateToProps = (state) => {
	return {
		data: state.data,
	};
}

export default connect(mapStateToProps)(Main);