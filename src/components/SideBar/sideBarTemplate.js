import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { ListGroup } from 'react-bootstrap';
import { Context } from '../../state';
import SystemNotification from '../../common/systemNotification'

const SideBarTemplate = (props) => {
  const { name } = props

  const [state, dispatch] = useContext(Context);
  const [toggle, setToggle] = useState(true)

  var row = 0;

  const RenderFields = () => {

    var templates = state.template.map(function (t) {
      var url = '#' + row;
      var key = "template" + row;

      row++;

      return <ListGroup.Item action href={url} key={key} onClick={(event) => OnClickTemplate(event, t.id)}>{t.title}</ListGroup.Item>;
    })

    return (
      <ListGroup>
        {templates}
      </ListGroup>
    )
  }

  const OnClick = (e) => {
    e.preventDefault();
    SystemNotification.ActiveMenu(dispatch, !toggle ? name : '');
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
        <span className="MenuItem" style={{ cursor: "pointer", color: state.activeMenu === name ? 'white' : '' }}>Templates</span>

        <div className="MenuItem" style={{ float: "right", color: state.activeMenu === name ? 'white' : '' }} >
          <span> <FontAwesomeIcon icon={faAngleRight} /></span>
        </div>

      </div>
      {toggle && (RenderFields())}

    </React.Fragment>
  );
};

export default SideBarTemplate;