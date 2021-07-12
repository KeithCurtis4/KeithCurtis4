import React from 'react';
import { Modal, Row, Col, FormGroup, FormLabel } from 'react-bootstrap'


const TitleEditor = () => {
    var selectedText=''

    return (
        <React.Fragment>
            <div className="form-control form-control-md">
                <FormGroup>
                    <FormLabel>Title</FormLabel>
                    <input type="text" className="form-control form-control-md" id="linkText" value={selectedText}></input>
                </FormGroup>
            </div>
        </React.Fragment>
    );
};

export default React.memo(TitleEditor);