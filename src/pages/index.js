import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import TopNavBar from '../components/TopNavBar';
import Editor from '../components/Editor';
import { Context } from '../state';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Notification from '../components/Notification'
import Authentication from '../components/Authentication'

const MainPage = (props) => {
  const [state, dispatch] = useContext(Context);
  
  return (
    <Container fluid>
        <Row>
          <Col lg={2} className="SideBar" style={{ paddingRight: "0px" }}>
            <SideBar displayApplicationList displayEmailTypes emailContent applicationCode=''/>
          </Col>
          <Col lg={10} className="col-10 MainContent border-light" style={{ paddingLeft: "0px" }}>
            <TopNavBar title='Select Application' />
            <Editor></Editor>
            </Col>
          <Notification></Notification>
          <Authentication></Authentication>
        </Row>
      </Container>

  );
}

export default React.memo(MainPage);