import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col} from 'react-bootstrap';
import  SideBarEmailTypes from './sideBarEmailTypes';
import { Context } from '../../state';
import SideBarEmails from './sideBarEmails';
import SideBarApplications from './sidebarApplications';
import SystemNotification from '../../common/systemNotification'

const SideBar = (props) => {
  const {applicationCode, displayDataFields, displayApplicationList, displayEmailTypes, displayEmailList  } = props
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    
    if (state.applicationCode !== applicationCode && applicationCode) {
       SystemNotification.SetApplication(dispatch, applicationCode);
    }
    });

  
  return (
      <React.Fragment>
        <Container fluid style={{paddingRight: "15px", paddingLeft: "0px"}}>
        <div style={{paddingTop: "10px"}}>
            <strong>MAIN MENU</strong>
            <hr/>
        </div>
        {displayApplicationList  && (<SideBarApplications name="applications"></SideBarApplications>)}
        {displayEmailTypes  && (<SideBarEmailTypes name="email"></SideBarEmailTypes>)}
        
        <div style={{paddingTop: "10px"}}>
          {state.emailList && (<SideBarEmails name="content"></SideBarEmails>)}
        </div>
        
        {displayDataFields  && (
        <Row style={{paddingTop: "10px"}}>
          <Col>
            <FontAwesomeIcon icon={faDatabase} /> Data Fields
            <hr></hr>
          </Col>
        </Row>)}
      
        </Container>
       </React.Fragment>
    );
   };

  export default React.memo(SideBar);