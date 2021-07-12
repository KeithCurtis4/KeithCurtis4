import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { ListGroup } from 'react-bootstrap';
import { Context } from '../../state';
import { GetURLData } from '../../services/getURLData'
import Service from '../../services';
import SystemNotification from '../../common/systemNotification'

const SideBarApplications = (props) => {
  const { name } = props;
  const [state, dispatch] = useContext(Context);
  const [toggle, setToggle] = useState(true);
  const [applications, SetApplications] = useState([]);
  var row = 0;

  
  const OnClick = (e) => {
    e.preventDefault();
    SystemNotification.ActiveMenu(dispatch, !toggle ? name : '');
    setToggle(!toggle);
  }

  const OnClickItem = (e, appCode) => {
    e.preventDefault();
    SystemNotification.ClearData(dispatch);
    SystemNotification.SetApplication(dispatch, appCode);
  }

  const RenderFields = () => {
    var templates = applications.map(function (t) {
      var url = '#' + row;
      var key = "email" + row;

      row++;

      return <ListGroup.Item action href={url} key={key} onClick={(event) => OnClickItem(event, t.ApplicationCode)}>{t.Application}</ListGroup.Item>;
    })

    return (
      <ListGroup>
        {templates}
      </ListGroup>
    )
  };

  const OnDataReceived = (data) => {
    SetApplications(data);
    SystemNotification.ClearData(dispatch);
    
    if (data.length === 0)
       SystemNotification.DisplayNotificationError(dispatch, 'Applications not found!');
  }

  useEffect(() => {
   GetURLData(Service.GetWorkflowApplications(), dispatch, OnDataReceived);
  },[]);

  return (
    <React.Fragment>
      <div style={{ cursor: "pointer", paddingBottom: "10px" }} onClick={(event) => OnClick(event)}>
        <div className="MenuItemIcon MenuItem" style={{ float: "left", color: state.activeMenu === name ? 'white' : '' }}>
          <span> <FontAwesomeIcon icon={faEnvelope} /></span>
        </div>
        <span className="MenuItem" style={{ cursor: "pointer", color: state.activeMenu === name ? 'white' : '' }}>Application</span>
        <div className="MenuItem" style={{ float: "right", color: state.activeMenu === name ? 'white' : '' }} >
          <span> <FontAwesomeIcon icon={faAngleRight} /></span>
        </div>

      </div>
      {toggle && (RenderFields())}
    </React.Fragment>
  );
};

export default React.memo(SideBarApplications);