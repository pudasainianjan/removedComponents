import React,{useState,useEffect} from 'react';
import { PageHeader, Tabs, Button, Statistic, Descriptions,Popconfirm } from 'antd';
import { Card, Col, Row , message, Skeleton} from 'antd';
import {getClientById} from "../../../../services/api/grpc_call_instances/Client";
import {getCustomerById} from "../../../../services/api/grpc_call_instances/Customer";
import {getUserById} from "../../../../services/api/grpc_call_instances/User";
import Title from 'antd/lib/typography/Title';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import history from '../../../../history';
import './showSingle.css';


const marginBottom = {
  marginBottom: '30px'
}

const SingleDetail = () =>{
    const { TabPane } = Tabs;

    const [title, setTitle] = useState('Loading');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const url = window.location.pathname.split('/');
        const id = url[3];
        const title = url[1];
        setTitle(title);
        console.log('title',id);
        // console.log('from single page',title)
    
        //identify whose detail to render...(client,user and customer)
        if(title === 'client'){
          getClientDetail(id);
        }
        else if(title === 'customer'){
          getCustomerDetail(id);
        }
        else if(title === 'user'){
          getUserDetail(id);
        }
        
      }, [])


      //HELPER FUNCTIONS

      //FOR CLIENT FETCHING
      const getClientDetail = (id) =>{
    
        setLoading(true);
        //'FEE1CE36FFFE4DDAA9C039A9DCF9E389'
        getClientById(id).then(res=>{   //this id exists, checked
          message.success('Successfully got response form id.. '+id+" see console");
          console.log('fetching client with id success...',res);
          createDataForClientTable(res.getClient());
        }).catch(err=>{
          message.error("Error in fetching fetching client with id "+id+" Error Message: "+" Error Message: "+ err.message?err.message:'Error message not provided by server');
        }); 
    
    
      const createDataForClientTable = (client)=>{
          if(!client){
            //setting custom data for test
          }
          let clientData={};
          clientData.key = client.getId();
          clientData.id=client.getId();
          clientData.company_name=client.getName();
          clientData.pan=client.getPan();
          clientData.registration_number=client.getRegistrationNumber();
          clientData.contact_name=client.getContactName();
          clientData.contact_mobile=client.getContactMobile();
          clientData.short_code = client.getShortCode();
          clientData.company_type=client.getType()===false?client.getType():'---';
          clientData.phone=client.getPhone();
          clientData.email=client.getEmail();
          clientData.logo_url=client.getLogoUrl();
          clientData.company_registration_url=client.getCompanyRegistrationUrl();
          console.log('from table this is client object',clientData);
          setData(clientData);
          setLoading(false);
      }
    }
    
    
    //FOR CUSTOMER BY ID FETCHING
    const getCustomerDetail = (id) =>{
    
        setLoading(true);
        //'FEE1CE36FFFE4DDAA9C039A9DCF9E389'
        getCustomerById(id).then(res=>{   //this id exists, checked
          message.success('Successfully got response form id.. '+id+" see console");
          console.log('fetching Customer with id success...',res);
          createDataForCustomerTable(res.getCustomer());
        
        }).catch(err=>{
          message.error("Error in fetching fetching Customer with id "+id+" Error Message: "+" Error Message: "+ err.message?err.message:'Error message not provided by server');
        }); 
    
    
      const createDataForCustomerTable = (customer)=>{
        if(!customer){
          //setting custom data if there isnt anything
          setData({
            key:'123456',
            id: id,
            name:'Ram',
            date_of_birth: '2022-10-10',
            mobile:'9849564585',
            email:'anjanpudasainiiiiii@gmail.com'
          });
          setLoading(false);
        }
        console.log('customer',customer)
          let customerData={};
          customerData.key = customer.getId();
          customerData.id=customer.getId();
          customerData.name=customer.getName();
          customerData.date_of_birth=customer.getDateOfBirth()?customer.getDateOfBirth():'---';
          customerData.mobile=customer.getMobile();
          customerData.email=customer.getEmail();
          customerData.status=getStatusStringForCustomer(customer.getStatus());
          customerData.belongs_to = customer.getBelongsTo();
          console.log('from table this is client object',customerData);
          setData(customerData);
          setLoading(false);
      }
    }


    //FOR CUSTOMER BY ID FETCHING
    const getUserDetail = (id) =>{
    
      setLoading(true);
      //'FEE1CE36FFFE4DDAA9C039A9DCF9E389'
      getUserById(id).then(res=>{   //this id exists, checked
        message.success('Successfully got response form id.. '+id+" see console");
        console.log('fetching user with id success...',res);
        createDataForCustomerTable(res.getClient());
      
      }).catch(err=>{
        message.error("Error in fetching fetching Customer with id "+id+" Error Message: "+" Error Message: "+ err.message?err.message:'Error message not provided by server');
      }); 
  
  
    const createDataForCustomerTable = (user)=>{
      if(!user){
        //setting custom data if there isnt anything
        setData({
          key:'123456',
          id: '12466',
          name:'Some User',
          date_of_birth: '2022-10-10',
          mobile:'9849564585',
          email:'anjanpudasainiiiiii@gmail.com'
        });
        setLoading(false);
      }
      console.log('customer',user)
        let userData={};
        userData.key = user.getId();
        userData.id=user.getId();
        userData.user_name=user.getUserName();
        userData.role=mapRoleToString(user.getRole());
        userData.active=user.getActive();
        console.log('from table this is user object',userData);
        setData(userData);
        setLoading(false);
    }
  }
    
    
    
    //returns customer status
    const getStatusStringForCustomer = statusCode =>{    //becaseu server returns status 0 1 or 2 for none, subscribed and unsubscribed
      // const subscriptionStatus = '';
      switch (statusCode) {
        case 1:
          return 'SUBSCRIBED';
    
        case 2:
          return 'UNSUBSCRIBED';
    
        case 0:
          return 'NONE';
    
        default:
          break;
      }
    }

    //returns customer status
    const mapRoleToString = rolecode =>{    //becaseu server returns status 0 1 or 2 for none, subscribed and unsubscribed
      // const subscriptionStatus = '';
      switch (rolecode) {
        case 0:
          return 'NONE';
    
        case 1:
          return 'ADMIN';
    
        case 2:
          return 'CLIENT';

        case 3:
          return 'RESELLER';
        
        case 4:
          return 'REPORTER';
    
        default:
          break;
      }
    }

    // //HELPER FUNCTIONS
    // const renderDetail = Object.entries(data).map((value)=>{
    //     return <Col span={8} style={marginBottom} key={value[0]}>
    //             <Card bordered={true}>
    //             <Title level={2}>{value[0]}</Title>
    //               <Card.Grid style={gridStyle}>{value[1]}</Card.Grid>
    //             </Card>
    //           </Col>
    //     });

    const renderEachItem = Object.entries(data).map((value)=>{
      if(value[0]==='key'){
        return;
      }
        return <>
                <Descriptions.Item key={value[0]} style={marginBottom} label={<Title level={5}>{value[0]}</Title>}>{value[1]}</Descriptions.Item>
              </>
    });

    const renderContent = (column = 2) => (
      <Descriptions size="small" column={column}>
        {renderEachItem}
      </Descriptions>
    );

    const extraContent = (
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          justifyContent: 'flex-end',
        }}
      >
        <Statistic
          title={title === 'user' ? 'Role':'Status'}
          value={title === 'user' ? data.role:'Verified'}
          style={{
            marginRight: 32,
          }}
        />
        <Statistic title="Total Payment" prefix="Rs." value={5688} />
      </div>
    );

    const Content = ({ children, extra }) => (
      <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
      </div>
    );

    return(
      <>
        <Skeleton active loading={loading}>
        <PageHeader
          loading={loading}
          className="site-page-header-responsive"
          onBack={() => window.history.back()}
          title={<Title level={5}>{ title.toUpperCase()+" DETAIL" || 'Some Title'}</Title>}
          subTitle="Detail Of Client"
          extra={[
            <Popconfirm
              title="Are you sure to update this task?"
              // onConfirm={confirm}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button key="update" className="ant-btn ant-btn-dashed" type="primary" icon={<EditOutlined />}>
                Update Client
              </Button>
            </Popconfirm>,  
            <Popconfirm
            title="Are you sure to delete this user?"
            // onConfirm={confirm}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button key="delete" className="ant-btn ant-btn-dashed" type="danger"icon={<EditOutlined />} >
              Delete
            </Button>
          </Popconfirm>, 
          ]}
          footer={
            <Tabs defaultActiveKey="1">
              <TabPane tab="Details" key="1" />
              <TabPane tab="Rule" key="2" />
            </Tabs>
          }
        >
          <Content extra={extraContent}>{renderContent()}</Content>
        </PageHeader>
        </Skeleton>
      </>
    );
}

export default SingleDetail;






































// import React,{useState,useEffect} from 'react';
// import { Card, Col, Row , message, Skeleton, notification} from 'antd';
// import {getClientById} from "../../../../services/api/grpc_call_instances/Client";
// import {getCustomerById} from "../../../../services/api/grpc_call_instances/Customer";
// import Title from 'antd/lib/typography/Title';
// import Text from 'antd/lib/typography/Text';
// import { ArrowLeftOutlined } from '@ant-design/icons';
// import history from '../../../../history';
// import './showSingle.css';


// const gridStyle = {
//   width: '100%',
//   textAlign: 'center',
// };

// const marginBottom = {
//   marginBottom: '30px'
// }

// const styleArrow = {
//   fontSize:50,
//   marginBottom:"25px",
//   cursor:'pointer',

// }

// const SingleDetail = (props) =>{
//   const [title, setTitle] = useState('Loading');
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(false);

  
//   useEffect(() => {
//     const url = window.location.pathname.split('/');
//     const id = url[3];
//     const title = url[1];
//     setTitle(title);
//     console.log('title',id);
//     // console.log('from single page',title)

//     //identify whose detail to render...(client,user and customer)
//     if(title === 'client'){
//       getClientDetail(id);
//     }
//     else if(title === 'customer'){
//       getCustomerDetail(id);
//     }
    
//   }, [])


//   //FOR CLIENT FETCHING
//   const getClientDetail = (id) =>{

//       setLoading(true);
//       //'FEE1CE36FFFE4DDAA9C039A9DCF9E389'
//       getClientById(id).then(res=>{   //this id exists, checked
//         message.success('Successfully got response form id.. '+id+" see console");
//         console.log('fetching client with id success...',res);
//         createDataForClientTable(res.getClient());
//       }).catch(err=>{
//         message.error("Error in fetching fetching client with id "+id+" Error Message: "+" Error Message: "+ err.message?err.message:'Error message not provided by server');
//       }); 


//     const createDataForClientTable = (client)=>{
//         if(!client){
//           //setting custom data for test
//         }
//         let clientData={};
//         clientData.key = client.getId();
//         clientData.id=client.getId();
//         clientData.company_name=client.getName();
//         clientData.pan=client.getPan();
//         clientData.registration_number=client.getRegistrationNumber();
//         clientData.contact_name=client.getContactName();
//         clientData.contact_mobile=client.getContactMobile();
//         clientData.short_code = client.getShortCode();
//         clientData.company_type=client.getType()===false?client.getType():'---';
//         clientData.phone=client.getPhone();
//         clientData.email=client.getEmail();
//         clientData.logo_url=client.getLogoUrl();
//         clientData.company_registration_url=client.getCompanyRegistrationUrl();
//         console.log('from table this is client object',clientData);
//         setData(clientData);
//         setLoading(false);
//     }
//   }


//   //FOR CUSTOMER BY ID FETCHING
//   const getCustomerDetail = (id) =>{

//       setLoading(true);
//       //'FEE1CE36FFFE4DDAA9C039A9DCF9E389'
//       getCustomerById(id).then(res=>{   //this id exists, checked
//         message.success('Successfully got response form id.. '+id+" see console");
//         console.log('fetching Customer with id success...',res);
//         createDataForCustomerTable(res.getCustomer());
        
//       }).catch(err=>{
//         message.error("Error in fetching fetching Customer with id "+id+" Error Message: "+" Error Message: "+ err.message?err.message:'Error message not provided by server');
//       }); 
  

//     const createDataForCustomerTable = (customer)=>{
//       if(!customer){
//         //setting custom data if there isnt anything
//         setData({
//           key:'123456',
//           id: id,
//           name:'Ram',
//           date_of_birth: '2022-10-10',
//           mobile:'9849564585',
//           email:'anjanpudasainiiiiii@gmail.com'
//         });
//         setLoading(false);
//       }
//       console.log('customer',customer)
//         let customerData={};
//         customerData.key = customer.getId();
//         customerData.id=customer.getId();
//         customerData.name=customer.getName();
//         customerData.date_of_birth=customer.getDateOfBirth()?customer.getDateOfBirth():'---';
//         customerData.mobile=customer.getMobile();
//         customerData.email=customer.getEmail();
//         customerData.status=getStatusStringForCustomer(customer.getStatus());
//         customerData.belongs_to = customer.getBelongsTo();
//         console.log('from table this is client object',customerData);
//         setData(customerData);
//         setLoading(false);
//     }
//   }

// //HELPER FUNCTIONS
//   const renderDetail = Object.entries(data).map((value)=>{
//       return <Col span={8} style={marginBottom} key={value[0]}>
//               <Card bordered={true}>
//               <Title level={2}>{value[0]}</Title>
//                 <Card.Grid style={gridStyle}>{value[1]}</Card.Grid>
//               </Card>
//             </Col>
//       });

//   //returns customer status
//   const getStatusStringForCustomer = statusCode =>{    //becaseu server returns status 0 1 or 2 for none, subscribed and unsubscribed
//     // const subscriptionStatus = '';
//     switch (statusCode) {
//       case 1:
//         return 'SUBSCRIBED';

//       case 2:
//         return 'UNSUBSCRIBED';

//       case 0:
//         return 'NONE';
    
//       default:
//         break;
//     }
//   }
  
  
//     return(
//       <Skeleton loading={loading}>
//         <div className="site-card-wrapper">
//           <div className="arrowContainer">
//              <ArrowLeftOutlined onClick={()=>history.goBack()} twoToneColor="#eb2f96" style={styleArrow} />
//           </div>
//               <Card>
//               <Title style={marginBottom} level={2}><Text code>{title.toUpperCase()+" DETAIL"}</Text></Title>
//               <div className="site-card-wrapper">
//                 <Row gutter={16} wrap={true} id="" className="row-of-cards">

//                   {renderDetail}

//                 </Row>
//               </div>
//               </Card>
//           </div>
//         </Skeleton>
//     );
// }

// export default SingleDetail;