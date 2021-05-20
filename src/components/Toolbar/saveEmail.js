import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../state';
import { Modal, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Service from '../../services';
import _ from 'lodash'
import { GetURLData } from '../../services/getURLData'
import Base64 from '../../common/base64'

const SaveEmail = (props) => {
     const { display, onClose } = props;
     const [state, dispatch] = useContext(Context);
     const [progress, SetProgress] = useState(0);
     
     const block_size = 1024;
     
     var encodedEmail ='';

     useEffect(() => {
          if(!display)
               SetProgress(0);
          }, [display]);
        
     const findTemplateFromID = (id) => {
          let content = _.find(state.emailContent, function (o) { return o.WorkflowEmailContentID === id; });

          return content === undefined ? null : content.EmailContent;
     }

     const DisplayErrorNotification = (msg) => {
          dispatch({ type: 'SET_NOTIFICATION_ERROR', payload: msg });
     }

     const DisplaySuccessNotificaiton = (msg) => {
          dispatch({ type: 'SET_NOTIFICATION_OK', payload: msg });
     }

     const handleClose = (e) => {
          if (e) e.preventDefault();
          onClose();
     }

     const onDataRecievedSaveBlock = (data, obj) => {
          console.log('data',data);
         SaveEmailContent(obj.uploadID, obj.max, obj.start, obj.count, data);
     }

     const SaveBlock = (uploadID, content, start, count, max) => {
          const workflowEmailContentID = state.activeTemplate;
          const url = Service.UpdateWorkflowEmailContent(workflowEmailContentID, uploadID, max, count, content);
          
          const saveObj={
               uploadID,
               max,
               count: count+1,
               start: start+block_size,
               };

          GetURLData(url, dispatch, onDataRecievedSaveBlock, saveObj, false);
     }


     const SaveEmailContent = (uploadID, maxBlocks, start, count, status) => {
         if (count < maxBlocks && status === 'ok') {
               let content = encodedEmail.substring(start, start + block_size);
               SetProgressBar(count+1, maxBlocks);
               SaveBlock(uploadID, content, start, count, maxBlocks);
          }
          else {
              
               if (status === 'ok') {
                    DisplaySuccessNotificaiton('Email Saved Successfully!');
               }
               else {
                    DisplayErrorNotification('Error saving email content blocks');
               }
               
               onClose();
          }
     }

     const SetProgressBar = (current, max) => {
          var unit = 100 / (max);
          
          SetProgress(unit * current);

     };

     const OnDataReceivedGUID = (data, obj) => {
          if (data[0].ID) {
               SaveEmailContent(data[0].ID, obj.numberOfBlocks, 0, 0, 'ok');
          }
          else {
               DisplayErrorNotification('Error Saving Content: Connect get Email GUID');
               onClose();
          }
     }

     const Save = () => {
          const email = findTemplateFromID(state.activeTemplate);
          const json = JSON.stringify(email);
          encodedEmail =Base64.encode(json);

          console.log(encodedEmail);
        
          var numberOfBlocks = encodedEmail.length / block_size;

          const wholeBlocks = Math.trunc(numberOfBlocks)

          //Total number of blocks being sent
          if (wholeBlocks < numberOfBlocks)
               numberOfBlocks = Math.trunc(++numberOfBlocks);

          var saveOBJ = {
               numberOfBlocks
          };

          const url = Service.GetGUID();

          GetURLData(url, dispatch, OnDataReceivedGUID, saveOBJ);
     };

     const SaveEmailOK = (e) => {
          if (e) e.preventDefault();
          Save();

     }


     return (
          <Modal show={display} onHide={handleClose} animation="false">
               <Modal.Header closeButton>
                    <Modal.Title>
                         <span className='ModalIcon'> <FontAwesomeIcon icon={faQuestionCircle} /></span>&nbsp;
                  Save Email
               </Modal.Title>
               </Modal.Header>

               <Modal.Body>
                    <p>Save email are you sure? </p>
                    {progress > 0 && (<ProgressBar now={progress} />)}
               </Modal.Body>

               <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={(event) => handleClose(event)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={(event) => SaveEmailOK(event)}>Save changes</button>
               </Modal.Footer>
          </Modal>
     );
};

export default React.memo(SaveEmail);