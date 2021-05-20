import React, { useContext} from 'react';
import { Context } from '../../state';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Service from '../../services';
import fetchJsonp from 'fetch-jsonp';
import _ from 'lodash'
import { useSnackbar } from 'react-simple-snackbar'

const SaveEmail = (props) => {
     const [openSnackbar, closeSnackbar] = useSnackbar()
     const { display, onClose } = props;
     const [state, dispatch] = useContext(Context);
     const block_size = 1024;
     
     const findTemplateFromID = (id) => {
          let content = _.find(state.emailContent, function (o) { return o.WorkflowEmailContentID === id; });

          return content === undefined ? null : content.EmailContent;
     }

     const handleClose = (e) => {

          if (e) e.preventDefault();
          onClose();
     }

     const SaveBlock= (uploadID, content, count,  max) =>{
          const workflowEmailContentID =  state.activeTemplate;
          const url = Service.UpdateWorkflowEmailContent(workflowEmailContentID,uploadID, max, count, content );

          fetchJsonp(url)
          .then(function (response) {
               return response.json();
          }).then(function (json) {
               console.log('json', json);
          }).catch(function (ex) {
               dispatch({ type: 'SET_SERVICE_ERROR', payload: 'Error Upload Email Content: SaveBlock exception - ' + ex });
          })
     }

     const SaveEmailContent = (GUID, MaxBlocks, encodedEmail) => {
          var UploadID = "";
          var start =0

         if (GUID) {
               const data = JSON.parse(GUID);
               if (data.length > 0) UploadID = data[0].ID;
          }

          if (UploadID) {
               for(let count=0;count<MaxBlocks;count++)
               {
                    let content = encodedEmail.substring(start, start+block_size);
                    SaveBlock(UploadID, content, count, MaxBlocks);
                    start +=block_size;
               }
               onClose();
          }

          if (!UploadID)
          {
               dispatch({ type: 'SET_SERVICE_ERROR', payload: 'Error Upload Email Content: Upload ID is blank' });
               onClose();
          }

     }

     const Save = () => {
          const email = findTemplateFromID(state.activeTemplate);
          const json = JSON.stringify(email);
          openSnackbar('This is the content of the Snackbar.');

          var encodedEmail = btoa(json);

          console.log('encodedEmail', encodedEmail);
          var numberOfBlocks = encodedEmail.length / block_size;
          const wholeBlocks = Math.trunc(numberOfBlocks)

          //Total number of blocks being sent
          if (wholeBlocks < numberOfBlocks) numberOfBlocks = Math.trunc(++numberOfBlocks);

          var count = 0;
          var start = 0;
          var end = 0;

          const url = Service.GetGUID();

          fetchJsonp(url)
               .then(function (response) {
                    return response.json();
               }).then(function (json) {
                    SaveEmailContent(json.data, numberOfBlocks, encodedEmail);
               }).catch(function (ex) {
                    dispatch({ type: 'SET_SERVICE_ERROR', payload: 'Error Upload Email Content: GetGUID exception - ' + ex });
               })
     };

     const SaveEmail = (e) => {
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
               </Modal.Body>

               <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={(event) => handleClose(event)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={(event) => SaveEmail(event)}>Save changes</button>
               </Modal.Footer>
          </Modal>
     );
};

export default React.memo(SaveEmail);