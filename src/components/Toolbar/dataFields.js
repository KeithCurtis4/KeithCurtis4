import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../state';
import { Modal, Row, Col, FormGroup, FormLabel } from 'react-bootstrap'
import _ from 'lodash'

const DataFields = (props) => {
    const [state, dispatch] = useContext(Context);

    const OnClick = (e, name, key) => {

        setEditorFocus();

        var dateFieldHTML = "<span class='DataField' name='".concat(key).concat("'>[").concat(name).concat("]</span>");

        console.log('dateFieldHTML: ', dateFieldHTML);
        document.execCommand("insertHTML", false, dateFieldHTML);
    }

    const setEditorFocus = () => {
        if (state.editorFocus) {
            state.editorFocus.focus();
        }
    }

    const RenderDataFields = () => {
        var row = 0;
        var templates = state.dataFields.map(function (t) {

            var url = '#' + row;
            var key = "dataFields" + row;

            row++;
            console.log('t', t);

            return <li className="list-group-item list-group-item-primary" key={t.Title}>
                <button type="button" className="btn btn-outline-dark DataFieldButton" title="Bold" onClick={(event) => OnClick(event, t.Title, t.Key)}>{t.Title}</button>
            </li>
        });

        return (
            <ul className="list-group DataFieldList">
                {templates}
            </ul>
        )
    }


    return (

        <div style={{ position: 'relative', paddingTop: '37px' }}>
            <div style={{ position: 'absolute', zindex: '1000' }}>
                {RenderDataFields()}
            </div>
        </div>
    );
};

export default DataFields;