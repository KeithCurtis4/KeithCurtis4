
import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../../assets/images/Parallon-Logo-horiz-white-400.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { Context } from '../../state';



const TopNavBar = (props) => {
  const {title} = props
  const [state] = useContext(Context);
  
  const navBarTitle = title||state.title;
 
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" className="NavigationContainer">
        <Navbar.Brand href="#home"><img alt="" src={Logo} width="220" /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <Nav.Link href="#deets"><span className="NavigationContent"><FontAwesomeIcon icon={faMailBulk} /> {navBarTitle} </span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </React.Fragment>
  );
};

export default React.memo(TopNavBar);