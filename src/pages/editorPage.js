import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import TopNavBar from '../components/TopNavBar';
import Editor from '../components/Editor';

const EditorPage = () => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={2} className="SideBar" style={{ paddingRight: "0px" }}>
            <SideBar template dataFields />
          </Col>
          <Col lg={10} className="col-10 MainContent border-light" style={{ paddingLeft: "0px" }}>
            <TopNavBar />
            <Editor></Editor>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}


export default React.memo(EditorPage);