import React, {useState, useContext } from 'react'
import { Context } from '../../state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faLink, faSave, faAlignLeft, faAlignRight, faAlignCenter, faAlignJustify, faTrash, faCode, faFont, faEyeDropper, faCopy, faPaste, faCut, faEraser, faListOl, faListUl, faDatabase} from '@fortawesome/free-solid-svg-icons'
import LinkEditor from './linkEditor';
import DataFields from './dataFields';
import CodeEditor from '../CodeEditor'
import SaveEmail from './saveEmail'

const Toolbar = (props) => {
    const { visible } = props
    const [showLinkEditor, setShowLinkEditor] = useState(false);
    const [showCodeEditor, setShowCodeEditor] = useState(false);
    const [showSaveEmail,  setShowSaveEmail] = useState(false);
    const [showDataFields, setShowDataFields] = useState(false);
    const [activeEditor,  setActiveEditor] = useState('');
    const [state, dispatch] = useContext(Context);
  
    
    const OnClick = (e, cmd) => {
        e.preventDefault();

        switch (cmd) {
            
            default:
                setEditorFocus();
                document.execCommand(cmd);
                break;

        }
    }

    const OnClickHeading = (e, param) => {
        e.preventDefault();
        
        switch (param) {
            default:
                setEditorFocus();
                document.execCommand('formatBlock', true, param);
              
                break;

        }
    }

    const displayLinkEditor = (e) => {
        e.preventDefault();

        setShowLinkEditor(true);
    }

    const closeLinkEditor = () => {
        setShowLinkEditor(false);
    }

    const displayCodeEditor = () => {
        console.log(state);
        if(state.activeEditor){
            if(!showCodeEditor)
            {
                setActiveEditor(state.activeEditor)
            }
        setShowCodeEditor(!showCodeEditor);}
    }

    const closeCodeEditor = () => {
        setShowCodeEditor(false);
    }

    const displaySaveEmail = () => {
        setShowSaveEmail(!showSaveEmail);
    }
    const closeSaveEmail = () => {
        setShowSaveEmail(false);
    }
    
    const setEditorFocus = () => {
        state.editorFocus.focus();
    }

    return (
        <React.Fragment>
            
            {visible && (
            <div className="btn-toolbar Toolbar">
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-dark" title="Data Fields Document"  onClick={(event) => setShowDataFields(!showDataFields)}><FontAwesomeIcon icon={faDatabase} /></button>
                    {showDataFields && (<DataFields/>)}
                </div>
               
                <div className="btn-group  btn-padded-left">
                    <button type="button" className="btn btn-outline-dark" title="Bold" onClick={(event) => OnClick(event, 'bold')}><FontAwesomeIcon icon={faBold} /> </button>
                    <button type="button" className="btn btn-outline-dark" title="Italic" onClick={(event) => OnClick(event, 'italic')}><FontAwesomeIcon icon={faItalic} /></button>
                    <button type="button" className="btn btn-outline-dark" title="Underline" onClick={(event) => OnClick(event, 'underline')}><FontAwesomeIcon icon={faUnderline} /></button>
                </div>
                <div className="btn-group btn-padded-left">
                    <button type="button" className="btn btn-outline-dark" title="Left Align" onClick={(event) => OnClick(event, 'justifyLeft')}><FontAwesomeIcon icon={faAlignLeft} /> </button>
                    <button type="button" className="btn btn-outline-dark" title="Center Align" onClick={(event) => OnClick(event, 'justifyCenter')}><FontAwesomeIcon icon={faAlignCenter} /></button>
                    <button type="button" className="btn btn-outline-dark" title="Right Align" onClick={(event) => OnClick(event, 'justifyRight')}><FontAwesomeIcon icon={faAlignRight} /></button>
                    <button type="button" className="btn btn-outline-dark" title="Justify Full Align" onClick={(event) => OnClick(event, 'justifyFull')}><FontAwesomeIcon icon={faAlignJustify} /></button>
                </div>
                <div className="btn-group btn-padded-left">
                    <button type="button" className="btn btn-outline-dark" title="Header 1" onClick={(event) => OnClickHeading(event, "H1")}><b>H1</b></button>
                    <button type="button" className="btn btn-outline-dark" title="Header 2" onClick={(event) => OnClickHeading(event, "H2")}><b>H2</b></button>
                    <button type="button" className="btn btn-outline-dark" title="Header 3" onClick={(event) => OnClickHeading(event, "H3")}><b>H3</b></button>
                    <button type="button" className="btn btn-outline-dark" title="Header 4" onClick={(event) => OnClickHeading(event, "H4")}><b>H4</b></button>
                    <button type="button" className="btn btn-outline-dark" title="Header 5" onClick={(event) => OnClickHeading(event, "H5")}><b>H5</b></button>
                    <button type="button" className="btn btn-outline-dark" title="Header 6" onClick={(event) => OnClickHeading(event, "H6")}><b>H6</b></button>
                    <button type="button" className="btn btn-outline-dark" title="Paragraph" onClick={(event) => OnClickHeading(event, "P")}><b>P</b></button>
                </div>
                <div className="btn-group btn-padded-left">
                    <button type="button" className="btn btn-outline-dark" title="Cut" onClick={(event) => OnClick(event, 'cut')}><FontAwesomeIcon icon={faCut} /> </button>
                    <button type="button" className="btn btn-outline-dark" title="Copy" onClick={(event) => OnClick(event, 'copy')}><FontAwesomeIcon icon={faCopy} /></button>
                    <button type="button" className="btn btn-outline-dark" title="Paste" onClick={(event) => OnClick(event, 'paste')}><FontAwesomeIcon icon={faPaste} /></button>
                    <button type="button" className="btn btn-outline-dark" title="Delete" onClick={(event) => OnClick(event, 'delete')}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <div className="btn-group btn-padded-left" >
                    <button type="button" className="btn btn-outline-dark" title="Create a link" onClick={(event) => displayLinkEditor(event)}><FontAwesomeIcon icon={faLink} /> </button>
                    <button type="button" className="btn btn-outline-dark" title="Insert a list" onClick={(event) => OnClick(event, 'insertOrderedList')}><FontAwesomeIcon icon={faListOl} /></button>
                    <button type="button" className="btn btn-outline-dark" title="Insert a list" onClick={(event) => OnClick(event, 'insertUnorderedList')}><FontAwesomeIcon icon={faListUl} /></button>
                    <button type="button" className="btn btn-outline-dark" title="Edit color"><FontAwesomeIcon icon={faEyeDropper} /> </button>
                </div>
                <div className="btn-group btn-padded-left" >
                    <button type="button" className="btn btn-outline-dark" title="Edit Font"><FontAwesomeIcon icon={faFont} /></button>
                    <button type="button" className="btn btn-outline-dark" title="clear formatting" onClick={(event) => OnClick(event, 'removeFormat')}><FontAwesomeIcon icon={faEraser} /></button>
                    <button type="button" className="btn btn-outline-dark" title="Code View" onClick={(event) => displayCodeEditor(event)}><FontAwesomeIcon icon={faCode} /></button>
                </div>
                <div className="btn-group  btn-padded-left">
                    <button type="button" className="btn btn-outline-dark" title="Save Document"  onClick={(event) => displaySaveEmail(event)}><FontAwesomeIcon icon={faSave} /></button>
                </div>
            </div>)}
            <LinkEditor display={showLinkEditor} onClose={closeLinkEditor}/>
            <SaveEmail display={showSaveEmail} onClose={closeSaveEmail}/>
         
           
            {showCodeEditor  && (<CodeEditor onClose={closeCodeEditor} activeEditor={activeEditor}/>)}
            
        </React.Fragment>
    );
};

export default React.memo(Toolbar);