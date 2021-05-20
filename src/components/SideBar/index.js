import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col} from 'react-bootstrap';
import  SideBarEmail from './sideBarEmail';
import { Context } from '../../state';
import  SideBarEmailContent from './sideBarEmailContent';

const SideBar = (props) => {
  const { template, dataFields, emailContent, appCode} = props
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (state.application !== appCode) {
      dispatch({ type: 'SET_APPLICATION', payload: appCode });
    }
    });

  
  return (
      <React.Fragment>
        <Container fluid style={{paddingRight: "15px", paddingLeft: "0px"}}>
        <div style={{paddingTop: "10px"}}>
            <strong>MAIN MENU</strong>
            <hr/>
        </div>
        
        {emailContent  && (<SideBarEmail name="email"></SideBarEmail>)}
        
        <div style={{paddingTop: "10px"}}>
          {state.email && (<SideBarEmailContent name="content"></SideBarEmailContent>)}
        </div>
        
        {dataFields  && (
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