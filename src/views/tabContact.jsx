import React from 'react';
import {Tabs} from 'antd';
const { TabPane } = Tabs;

export default class Dashboard extends React.Component{
    render(){
        return(
            <TabPane {...this.props}>
                <div style= {{height:"374.6px"}}>
                    Contact
                </div>
                <div >
                    Contact
                </div>
            </TabPane>

        )
    }
}