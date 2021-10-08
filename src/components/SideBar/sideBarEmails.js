import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { ListGroup } from 'react-bootstrap';
import { Context } from '../../state';
import Service from '../../services';
import { GetURLData } from '../../services/getURLData'
import SystemNotification from '../../common/systemNotification'
import _ from 'lodash'

const SideBarEmails = (props) => {
  const { name } = props

  const [state, dispatch] = useContext(Context);
  const [toggle, setToggle] = useState(true)

  var row = 0;

  const RenderFields = () => {

    var templates = state.emailList.map(function (t) {
      var url = '#' + row;
      var key = "template" + row;

      row++;

      return <ListGroup.Item action href={url} key={key} onClick={(event) => OnClickTemplate(event, t.WorkflowEmailContentID)}>{t.EmailTitle}</ListGroup.Item>;
    })

    return (
      <ListGroup>
        {templates}
      </ListGroup>
    )
  }


  const ProcessContent = (data) => {
    _.forEach(data, function (value) {
      if (value.EmailContent) {
        var convertedValue = atob(value.EmailContent);
        value.EmailContent = JSON.parse(convertedValue);
      }
    });

    SystemNotification.SetEmailList(dispatch, data);
  }

  const OnDataReceived = (data) => {
    ProcessContent(data)

    if (data.length === 0)
      SystemNotification.DisplayNotificationError('No email content found!');
  }

  useEffect(() => {

    if (state.emailTypeID > 0) {
      const url = Service.GetApplicationEmailContent(state.emailTypeID);

      GetURLData(url, dispatch, OnDataReceived);
    }
  }, [state.emailTypeID]);


  const OnClick = (e) => {
    e.preventDefault();

    if (state.editorChange.activeEditor === '') {
      SystemNotification.ActiveMenu(dispatch, !toggle ? name : '');
      setToggle(!toggle);
    }

  }

  const OnClickTemplate = (e, id) => {
    e.preventDefault();
  
    if (state.editorChange.activeEditor === '') {
      SystemNotification.SetEmailID(dispatch, id);
    }
   
  }

  return (
    <React.Fragment>
      <div style={{ cursor: "pointer", paddingBottom: "10px" }} onClick={(event) => OnClick(event)}>
        <div className="MenuItemIcon MenuItem" style={{ float: "left", color: state.activeMenu === name ? 'white' : '' }}>
          <span> <FontAwesomeIcon icon={faCog} /></span>
        </div>
        <span className="MenuItem" style={{ cursor: "pointer", color: state.activeMenu === name ? 'white' : '' }}>Content</span>

        <div className="MenuItem" style={{ float: "right", color: state.activeMenu === name ? 'white' : '' }} >
          <span> <FontAwesomeIcon icon={faAngleRight} /></span>
        </div>

      </div>
      {toggle && (RenderFields())}

    </React.Fragment>
  );
};

export default SideBarEmails;