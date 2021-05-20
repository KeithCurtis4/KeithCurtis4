import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { ListGroup, Container, Row, Col, Nav } from 'react-bootstrap';
import { Context } from '../../state';
import Service from '../../services/';
import fetchJsonp from 'fetch-jsonp';

const SideBarEmail = (props) => {
  const { name } = props;
  const [state, dispatch] = useContext(Context);
  const [toggle, setToggle] = useState(true);

  const OnClick = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_ACTIVE_MENU', payload: !toggle ? name : '' });
    setToggle(!toggle);
  }

  const OnClickEmail = (e, id) => {
    e.preventDefault();
    dispatch({ type: 'SET_ACTIVE_EMAIL', payload: id });
  }
  var row = 0;

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

  const setBusy  = (busy) => {
  dispatch({ type: 'SET_BUSY', payload: busy });
  };

  
 
  const validateResponse = (json) => {
    var obj = null;
    setBusy(false);
    if(json){
    try {
       obj = JSON.parse(json.data);
    } catch (e) {
      dispatch({ type: 'SET_NOTIFICATION_ERROR', payload: e });
    }
    if(obj.length===0)
      dispatch({ type: 'SET_NOTIFICATION_ERROR', payload: 'Application email not found!'});
    }
    else
      dispatch({ type: 'SET_NOTIFICATION_ERROR', payload: 'Application email not found!'});
    return obj;
  };

  useEffect(() => {
    setBusy(true);
    if (state.application) {
      const url = Service.GetEmailsByApplicationCode(state.application);
      fetchJsonp(url)
        .then(function (response) {
          return response.json();
        }).then(function (json) {
          dispatch({ type: 'SET_EMAILS', payload: validateResponse(json) });
        }).catch(function (ex) {
          dispatch({ type: 'SET_NOTIFICATION_ERROR', payload: ex });
        })
    }
    
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