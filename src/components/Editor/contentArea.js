import React, { useRef, useContext, useEffect } from 'react'
import ContentEditable from 'react-contenteditable';
import { unescape, escape } from 'html-escaper';
import { Context } from '../../state';
import _ from 'lodash'
import SystemNotification from '../../common/systemNotification';

const ContentArea = (props) => {
     const [state, dispatch] = useContext(Context);
     const { area, contentID } = props
    
     const inputRef = useRef(null);
   
     var text = useRef(unescape(area.html));
     const findTemplateFromID = (id) => {
          let content = _.find(state.emailList, function (o) { return o.WorkflowEmailContentID === id; });

          return content === undefined ? null : content.EmailContent;
     }

     useEffect(() => {
       //   console.log('inputRef', inputRef.current.getEl().focus());
       //inputRef.current.el && inputRef.current.el.focus()
     });

     const handleChange = evt => {
          text.current = evt.target.value;

          var email = findTemplateFromID(state.emailId);
          let area = _.find(email.area, function (o) { return o.id === contentID; });

          area.html = escape(evt.target.value);
     };

     const updateFromCodeEditor = (code) => {
          var email = findTemplateFromID(state.emailId);
          let area = _.find(email.area, function (o) { return o.id === contentID; });

          area.html = escape(code);
          text.current = code;
     }

     const handleFocus = evt => {
          SystemNotification.ActiveEditor(dispatch, contentID);
          SystemNotification.SetEditorFocus(dispatch, inputRef.current.getEl());
          
     };

     useEffect(() => {
          if (state.editorChange.activeEditor === contentID) {
               updateFromCodeEditor(state.editorChange.code);
           }
     
     }, [state.editorChange]);

     const containerID = 'area' + contentID;

     return (
          <React.Fragment>
               <div className={containerID} >
                    <ContentEditable html={text.current} onChange={handleChange} onFocus={handleFocus} ref={inputRef} />
               </div>
          </React.Fragment>
     );
};

export default ContentArea;