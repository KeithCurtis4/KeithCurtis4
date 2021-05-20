import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { ListGroup } from 'react-bootstrap';
import { Context } from '../../state';
import Service from '../../services/';
import fetchJsonp from 'fetch-jsonp';
import _ from 'lodash'

const SideBarEmailContent = (props) => {
  const { name } = props

  const [state, dispatch] = useContext(Context);
  const [toggle, setToggle] = useState(true)

  var row = 0;

  const RenderFields = () => {

    var templates = state.emailContent.map(function (t) {
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


  const ConvertContent = (json) => {
    console.log(json.data);
    var data =  JSON.parse(json.data);
    
    _.forEach(data, function(value) {
      if(value.EmailContent){
      var convertedValue =atob(value.EmailContent); 
      value.EmailContent =  JSON.parse(convertedValue);}
    });
   
    dispatch({ type: 'SET_ACTIVE_CONTENT', payload: data });
  }

  useEffect(() => {
  if (state.email) {
      const url = Service.GetApplicationEmailContent(state.email);

      fetchJsonp(url)
        .then(function (response) {
          return response.json();
        }).then(function (json) {
          ConvertContent(json);
         }).catch(function (ex) {
          dispatch({ type: 'SET_SERVICE_ERROR', payload: ex });
        })
    }
  }, [state.email]);


  const OnClick = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_ACTIVE_MENU', payload: !toggle ? name : '' });
    setToggle(!toggle);

  }

  const OnClickTemplate = (e, id) => {
   e.preventDefault();
    dispatch({ type: 'SET_ACTIVE_TEMPLATE', payload: id });
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

export default SideBarEmailContent;