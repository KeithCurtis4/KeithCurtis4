import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Store from './state'
import SnackbarProvider from 'react-simple-snackbar'
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import SideBar from '../src/components/SideBar';
import TopNavBar from '../src/components/TopNavBar';
import ApplicationPage from './pages/applicationPage'



function App() {

  function Application() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { appCode } = useParams();
   
    return (
      <ApplicationPage appCode={appCode} /> 
    );
  }

  return (
    <Store> 
       <SnackbarProvider>
        <Router>
          <Switch>
            <Route path="/:appCode" children={<Application />} />
            <Route path="/">
              <Container fluid>
                <Row>
                  <Col lg={2} className="SideBar" style={{ paddingRight: "0px" }}>
                    <SideBar emailContent />
                  </Col>
                  <Col lg={10} className="col-10 MainContent border-light" style={{ paddingLeft: "0px" }}>
                    <TopNavBar title='Select Email Content' />
                  </Col>
                </Row>
              </Container>
            </Route>
        </Switch>
      </Router>
      </SnackbarProvider>
    </Store>
  );
}

export default App;
