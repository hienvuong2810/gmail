import React from 'react';
import {Tabs, Table } from 'antd';
import "./css.css"
const { TabPane } = Tabs;
const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
    {
        key: '3',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '4',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
      {
        key: '5',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '6',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
      {
        key: '7',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '8',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
      {
        key: '9',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '10',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
      {
        key: '11',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '12',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
      {
        key: '13',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '14',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
      {
        key: '15',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '16',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
  ];
  
  const columns = [
    {
      title: 'Gmail',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: "200px",
      editable: true,
    },
    {
      title: 'Password',
      dataIndex: 'age',
      key: 'age',
      width: "100px",
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
  ];
export default class Dashboard extends React.Component{
    render(){
        return(
            <TabPane {...this.props}>
                <Table 
                    dataSource={dataSource} 
                    columns={columns}  
                    scroll={{ y: 340 }}  
                    size="small" 
                    pagination={false}
                    bordered
                />
            </TabPane>

        )
    }
}