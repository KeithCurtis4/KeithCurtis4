import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../state';
import ContentArea from './contentArea';
import _ from 'lodash'
import Toolbar from '../Toolbar';
import TitleEditor from '../TitleEditor'

const Editor = () => {
     const [state, dispatch] = useContext(Context);
     const [emailId, setEmailId] = useState(-1);
     const [showToolbar, setShowToolbar] = useState(false);

     const findTemplateFromID = (id) => {
          let content = _.find(state.emailList, function (o) { return o.WorkflowEmailContentID === id; });

          return content === undefined ? null : content.EmailContent;
     }

     const disableStyleSheet = (styleSheet) => {
          
        if (styleSheet !== undefined) {
               styleSheet.disabled=true;
          }
     }

     const updateStyleSheet = (title, style) => {
        
          const styleSheet = _.find(document.styleSheets, function (sheet) { return sheet.title === title && sheet.disabled===false;});
          
          disableStyleSheet(styleSheet);
     
          const sheet = document.createElement('style')
          sheet.title = title;
          sheet.innerHTML = style;
          document.body.appendChild(sheet);

          console.log(document.styleSheets);
        
     }


     const setStyleContent = (editingContent) => {
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

               updateStyleSheet('contentEditor', styleContent);
          }
     }

     useEffect(() => {
          if (state.emailId !== emailId) {
               setStyleContent(findTemplateFromID(state.emailId));
               setEmailId(state.emailId);
               setShowToolbar(true);
          }
     }, [state.emailId]);



     const renderEditableAreas = () => {

          let contentAreas = null;
          const template = findTemplateFromID(state.emailId);

          if (template != null) {
               contentAreas = template.area.map(function (obj) {
                    return <ContentArea key={obj.id + state.emailId} area={obj} contentID={obj.id}></ContentArea>;
               })
          }

          return (
               <React.Fragment>
                    <Toolbar visible={showToolbar}></Toolbar>
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