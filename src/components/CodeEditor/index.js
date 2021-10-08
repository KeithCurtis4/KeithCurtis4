import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../state';
import Draggable from "react-draggable";
import _ from 'lodash'
import * as entities from 'entities'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import SystemNotification from '../../common/systemNotification';

const CodeEditor = (props) => {
   const { onClose, activeEditor } = props
   const [state, dispatch] = useContext(Context);
   const [content, setContent] = useState();

   const getContent = ()=>{
      var email = findTemplateFromID(state.emailId);
      let area = _.find(email.area, function (o) { return o.id === activeEditor; });

      return  entities.decodeHTML(area.html);
   }

   const findTemplateFromID = (id) => {
      let content = _.find(state.emailList, function (o) { return o.WorkflowEmailContentID === id; });
      
      return content === undefined ? null : content.EmailContent;
  }
  
   const handleClose = (e) => {

      if (e) e.preventDefault();
      onClose();
      var editorChange=
      {
         activeEditor: '',
         code: ''
      }
      
      SystemNotification.EditorChange(dispatch, editorChange);
   }
  
  useEffect(() => {
      setContent(getContent()); 
   },[]);

  
   

   return (
      <React.Fragment>
         <Draggable disabled={false}  handle="strong">
            <div className="CodeEditor box no-cursor">
               <strong className="modal-header cursor">
                  <h5 className="modal-title">Editing: region</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(event) => handleClose(event)}>
                     <span aria-hidden="true">&times;</span>
                  </button>
               </strong>
               <div className="modal-body CodeEditorBody">
                  
                  <CodeMirror
                     value={content}
                     onChange={(editor) => {
                        var editorChange=
                        {
                           activeEditor: state.activeEditor,
                           code: editor.getValue()
                        }
                        
                        SystemNotification.EditorChange(dispatch, editorChange);
                  
                      }}
                     options={{
                        theme: 'xq-light',
                        keyMap: 'sublime',
                        mode: 'jsx',
                     }}
                     />
                </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={(event) => handleClose(event)}>Close</button>
               </div>

            </div>
         </Draggable>
      </React.Fragment>

   );
};

export default React.memo(CodeEditor);