import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, FormGroup, FormLabel } from 'react-bootstrap'
import _ from 'lodash'

const LinkEditor = (props) => {
     const { display, onClose } = props
     const handleClose = (e) => {
       
          if (e) e.preventDefault();
          onClose();
     }

     const InsertLink = (e) => {
          if (e) e.preventDefault();

          onClose();
     }

    
     const selectedText = window.getSelection().toString();
     
     return (

          <Modal show={display} onHide={handleClose} animation="false">
               <Modal.Header closeButton>
                    <Modal.Title>Link Editor</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                    <FormGroup>
                         <FormLabel>Protocol</FormLabel>
                         <select className="form-control form-control-md" id="linkProtocol">
                              <option value="http">http</option>
                              <option>https</option>
                              <option>file</option>
                              <option>ftp</option>
                              <option>mailto</option>
                         </select>
                    </FormGroup>
                    <FormGroup>
                         <FormLabel>Link Text</FormLabel>
                         <input type="text" className="form-control form-control-md" id="linkText"  value={selectedText}></input>
                    </FormGroup>
                    <FormGroup>
                         <FormLabel>URL</FormLabel>
                         <input type="text" className="form-control form-control-md" id="linkURL" placeholder="wwww.url.com" ></input>
                    </FormGroup>
               </Modal.Body>

               <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={(event) => handleClose(event)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={(event) => InsertLink(event)}>Save changes</button>
               </Modal.Footer>
          </Modal>
     );
};

export default LinkEditor;