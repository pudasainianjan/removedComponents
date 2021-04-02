import React from 'react';
import { Row, Col, Table, Divider  } from 'antd';
import SuccessMessage from './SuccessMessage';
import PanelBox from './PanelBox';
import { PayCircleOutlined } from '@ant-design/icons';
import LineChart from './Chart/LineChart';
import ShowPieChart from './Chart/PieChart';
import ShowAreaChart from './Chart/AreaChart';
import Steps from './Steps';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  width: 150,
}, {
  title: 'Age',
  dataIndex: 'age',
  width: 150,
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const tableData = [];
for (let i = 0; i < 100; i++) {
  tableData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = ()=>{
    return(
    <div>
      <SuccessMessage />
        <div style={{'marginBottom': '20px'}}>
          <Steps />
        </div>

        <Row gutter={16} type="flex" justify="space-between">
          <Col xs={24} md={14}>
            <Row gutter={16} type="flex" justify="space-between">
              <Col className="ant-card-item" xs={24} md={8}>
                <PanelBox className="card-item shadow">
                  <PayCircleOutlined style={{fontSize: '40px'}} spin={true}/>
                  <ul>
                    <li><Divider orientation="left">$25,000</Divider></li>
                    <li>This Months Transaction</li>
                  </ul>
                </PanelBox>
              </Col>
              <Col className="ant-card-item" xs={24} md={8}>
                <PanelBox className="card-item shadow">
                <PayCircleOutlined style={{fontSize: '40px'}} spin={true}/>
                  <ul>
                  <li><Divider orientation="left">$25,000</Divider></li>
                    <li>Toady's Transaction</li>
                  </ul>
                </PanelBox>
              </Col>
              <Col className="ant-card-item" xs={24} md={8}>
                <PanelBox className="card-item shadow">
                <PayCircleOutlined style={{fontSize: '40px'}} spin={true}/>
                  <ul>
                  <li><Divider orientation="left">$25,000</Divider></li>
                    <li>On Hold Transactions</li>
                  </ul>
                </PanelBox>
              </Col>
              
            </Row>
            <PanelBox title="Our Customers" className="shadow">
                <ShowAreaChart />
            </PanelBox>
          </Col>
          <Col xs={24} md={10}>
            <PanelBox title="Line Chart" bodyStyle={ {'padding': 0}} className="shadow">
              
              <LineChart />
              
            </PanelBox>
            <PanelBox title="Our Users" bodyStyle={ {'padding': 0} } className="shadow">
              
               <ShowPieChart />
        
            </PanelBox>
          </Col>
        </Row>

        <PanelBox title="SOME IMPORTANT DATA">
          <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
        </PanelBox>
    </div>          
    );
}

export default Dashboard;
