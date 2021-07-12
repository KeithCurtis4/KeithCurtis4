import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import TopNavBar from '../components/TopNavBar';
import Editor from '../components/Editor';
import Authentication from '../components/Authentication'

const ApplicationPage = (props) => {
    const { appCode} = props
    return (
    <Container fluid>
        <Row>
            <Col lg={2} className="SideBar" style={{ paddingRight: "0px" }}>
              <SideBar displayEmailTypes applicationCode={appCode} />
            </Col>
            <Col lg={10} className="col-10 MainContent border-light" style={{ paddingLeft: "0px" }}>
              <TopNavBar title='Select Email Content'/>
             <Editor></Editor>
              <Authentication></Authentication>
            </Col>
          </Row>
    </Container>
  );
}


export default React.memo(ApplicationPage);