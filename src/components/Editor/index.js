import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../state';
import ContentArea from './contentArea';
import _ from 'lodash'
import Toolbar from '../Toolbar';
import CodeEditor from '../CodeEditor'

const Editor = () => {
     const [state, dispatch] = useContext(Context);
     const [editTemplateID, setEditTemplateID] = useState(-1);
     const [editingContent, setEditingContent] = useState(undefined);
     //const [StyleAdded, setEditingContent] = useState(true);

     const findTemplateFromID = (id) => {
         let content = _.find(state.emailContent, function (o) { return o.WorkflowEmailContentID === id; });
         
         return content === undefined ? null : content.EmailContent;
     }


     const updateStyleSheet = (title, style) => {
          const styleSheet = _.find(document.styleSheets, function (sheet) { return sheet.title === title; });

          if (styleSheet === undefined) {
               const sheet = document.createElement('style')
               sheet.title = title;
               sheet.innerHTML = style;
               document.body.appendChild(sheet);
          }
          else {
               styleSheet.innerHTML = style;
          }
     }

     useEffect(() => {
          var styleContent = '';

          if (editingContent !== undefined && editingContent) {
               let styles = _.join(editingContent.styles, ' #contentEditor ');

               if (styles) styleContent = "#contentEditor " + styles;

               editingContent.area.map(function (obj) {
                    var result = "";
                    var areaTitle = '.area' + obj.id
                    var areaStyles = _.join(obj.styles, ' ' + areaTitle + ' ');

                    if (areaStyles) {
                         styleContent = styleContent.concat(areaTitle, ' ', areaStyles);
                    }

                    return result;
               })

               updateStyleSheet(editingContent.title, styleContent);
          }

     }, [editingContent]);

     useEffect(() => {
          if (state.activeTemplate !== editTemplateID) {
              setEditingContent(findTemplateFromID(state.activeTemplate));
               setEditTemplateID(state.activeTemplate);
          }
     }, [state.activeTemplate]);

     const renderEditableAreas = () => {
          let contentAreas = null;

          if (editingContent != null) {
             contentAreas = editingContent.area.map(function (obj) {
                  return <ContentArea key={obj.id} area={obj} contentID={obj.id}></ContentArea>;
               })
          }

          // console.log('contentAreas', editingContent)
          return (
               <React.Fragment>
                    <Toolbar></Toolbar>
                    <div>
                         <div id="contentEditor">
                              {contentAreas}
                         </div>
                    </div>
                   </React.Fragment>
          )
     }

     return (
          <React.Fragment>
               {renderEditableAreas()}
          </React.Fragment>


     );
};

export default Editor;