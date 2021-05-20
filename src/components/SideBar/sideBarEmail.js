import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { ListGroup } from 'react-bootstrap';
import { Context } from '../../state';
import { GetURLData }  from '../../services/getURLData'
import Service from '../../services/';
import SystemNotification from '../../common/systemNotification'

const SideBarEmail = (props) => {
  const { name } = props;
  const [state, dispatch] = useContext(Context);
  const [toggle, setToggle] = useState(true);
  var row = 0;

  const OnClick = (e) => {
    e.preventDefault();
    SystemNotification.ActiveMenu(dispatch, !toggle ? name : '');
    setToggle(!toggle);
  }

  const OnClickEmail = (e, id) => {
    e.preventDefault();
    SystemNotification.ActiveEmail(dispatch, id);
  }
  
  const RenderFields = () => {
    var templates = state.emails.map(function (t) {
      var url = '#' + row;
      var key = "email" + row;

      row++;

      return <ListGroup.Item action href={url} key={key} onClick={(event) => OnClickEmail(event, t.WorkflowEmailID)}>{t.Title}</ListGroup.Item>;
    })

    return (
      <ListGroup>
        {templates}
      </ListGroup>
    )
  };

  const OnDataReceived = (data) => {
    SystemNotification.SetEmails(dispatch, data);
   
    if(data.length===0)
      SystemNotification.DisplayNotificationError(dispatch, 'Application email not found!');
  }

  useEffect(() => {
  if(state.application)
      GetURLData(Service.GetEmailsByApplicationCode(state.application), dispatch, OnDataReceived);
  }, [state.application]);

  return (
    <React.Fragment>
    <div style={{ cursor: "pointer", paddingBottom: "10px" }} onClick={(event) => OnClick(event)}>
        <div className="MenuItemIcon MenuItem" style={{ float: "left", color: state.activeMenu === name ? 'white' : '' }}>
          <span> <FontAwesomeIcon icon={faEnvelope} /></span>
        </div>
        <span className="MenuItem" style={{ cursor: "pointer", color: state.activeMenu === name ? 'white' : '' }}>Email</span>

        <div className="MenuItem" style={{ float: "right", color: state.activeMenu === name ? 'white' : '' }} >
          <span> <FontAwesomeIcon icon={faAngleRight} /></span>
        </div>

      </div>
      {toggle && (RenderFields())}
    </React.Fragment>
  );
};

export default React.memo(SideBarEmail);