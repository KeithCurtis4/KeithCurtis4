import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../state';
import Draggable from "react-draggable";
import Prism from "prismjs";

const CodeEditor = () => {
   const [state, dispatch] = useContext(Context);
   const [content, setContent] = useState();
   
   const handleChange = evt => {
      setContent( evt.target.value);
      Prism.highlightAll();
      };

   useEffect(() => {
        setContent(state.codeEditor.content);
        Prism.highlightAll();
      }
, [state.codeEditor.content]);

    return (
      <React.Fragment>
        <Draggable disabled={false}>
       <div className="CodeEditor">
         <div className="modal-header ">
            <h5 className="modal-title">Editing: region</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
               </button>
      </div>
          <div className="modal-body CodeEditorBody">
             <textarea className="CodeEditorText" tabIndex="-1" value={content} onChange={handleChange}></textarea>
             <pre>
              <code className="language-html">{content}</code>
            </pre>  
             <input tabIndex="-1"  type="checkbox" /> Fixed Window
          </div>
          <div className="modal-footer">
        
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>  
          
    </div>
    </Draggable>
       </React.Fragment>

    );
   };

  export default React.memo(CodeEditor);