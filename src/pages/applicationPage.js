import React,{useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import TopNavBar from '../components/TopNavBar';
import Editor from '../components/Editor';
import { Context } from '../state';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Notificaiton from '../components/Notification'

const ApplicationPage = (props) => {
    const { appCode} = props
    const [state, dispatch] = useContext(Context);
    
    
    useEffect(() => {
    
    }
, [state.busy]); 
  return (
    <BlockUi tag="div" blocking={state.busy}>
    <Container fluid>
      <Row>
          <Col lg={2} className="SideBar" style={{ paddingRight: "0px" }}>
            <SideBar emailContent appCode={appCode} />
          </Col>
          <Col lg={10} className="col-10 MainContent border-light" style={{ paddingLeft: "0px" }}>
            <TopNavBar title='Select Email Content'/>
            <Editor></Editor>
          </Col>
          <Notificaiton></Notificaiton>
        </Row>
   </Container>
   </BlockUi>
  );
}


export default React.memo(ApplicationPage);