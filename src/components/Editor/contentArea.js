import React, { useRef, useContext } from 'react'
import ContentEditable from "react-contenteditable";
import {unescape, escape} from 'html-escaper';
import { Context } from '../../state';
import _ from 'lodash'

const ContentArea = (props) => {
     const [state, dispatch] = useContext(Context);
     const { area, contentID} = props
     
    
     
     const text = useRef(unescape(area.html));
     
     const findTemplateFromID = (id) => {
          let content = _.find(state.emailContent, function (o) { return o.WorkflowEmailContentID === id; });
          
          return content === undefined ? null : content.EmailContent;
      }
     
     
     
      const handleChange = evt => {
          text.current = evt.target.value;

          var email = findTemplateFromID(state.activeTemplate);
          let area = _.find(email.area, function (o) { return o.id === contentID; });
         
          area.html = escape(evt.target.value);
          dispatch({ type: 'SET_CHANGED_CONTENT', payload: state.activeTemplate});

     };

    

     const handleFocus = evt => {
         const contentEditor = {x: 100, y:100, width:500, height:500, content: evt.target.innerHTML};
          dispatch({ type: 'SET_CODE_EDITOR', payload: contentEditor});
     };

     const containerID = 'area'+contentID;
     
     return (
          <React.Fragment>
            <div className={containerID}>
               <ContentEditable html={text.current} onChange={handleChange} onFocus={handleFocus} />
            </div>
          </React.Fragment>


     );
};

export default ContentArea;