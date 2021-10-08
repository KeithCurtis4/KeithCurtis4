const SystemNotification = {
    //Application Code 
    SetApplication: function (dispatch, applicationCode) {
        dispatch({ type: 'SET_APPLICATION_CODE', payload: applicationCode });
    },
    // Array of Email Types
    SetEmailTypeList: function (dispatch, data) {
        dispatch({ type: 'SET_EMAIL_TYPE_LIST', payload: data });
    }, 
     // ID of Active Email Type ,-1 when not selected
     SetEmailTypeID: function (dispatch, data) {
        dispatch({ type: 'SET_EMAIL_TYPE_ID', payload: data });
    }, 
    // Array of Emails 
    SetEmailList: function (dispatch, data) {
        dispatch({ type: 'SET_EMAIL_LIST', payload: data });
    }, 

     // ID of Active Email ,-1 when not selected
    SetEmailID: function (dispatch, data) {
        dispatch({ type: 'SET_EMAIL_ID', payload: data });
    }, 
    
    // Id of Email object
    ActiveMenu: function (dispatch, data) {
        dispatch({ type: 'SET_ACTIVE_MENU', payload: data });
    }, // Array of Email objects
     
    SetCodeEditor: function (dispatch, data) {
        dispatch({ type: 'SET_CODE_EDITOR', payload: data });
    },
    SetActiveContent: function (dispatch, data) {
        dispatch({ type: 'SET_ACTIVE_CONTENT', payload: data });
    },
    SetChangedContent: function (dispatch, data) {
        dispatch({ type: 'SET_CHANGED_CONTENT', payload: data });
    },
    SetBusy: function (dispatch, isBusy) {
        dispatch({ type: 'SET_BUSY', payload: isBusy });
    },
    DisplayNotification: function (dispatch, msg) {
        dispatch({ type: 'SET_NOTIFICATION', payload: msg });
    },
    DisplayNotificationError: function (dispatch, msg) {
        dispatch({ type: 'SET_NOTIFICATION_ERROR', payload: msg });
    },
    DisplayNotificationOk: function (dispatch, msg) {
        dispatch({ type: 'SET_NOTIFICATION_OK', payload: msg });
    },
    SetSecureUser:  function (dispatch, userName) {
        dispatch({ type: 'SET_SECURE_USER', payload: userName });
    },
    SetSecureApplication:  function (dispatch, applicationCode) {
        dispatch({ type: 'SET_SECURE_APPLICATION', payload: applicationCode });
    },
    SetEditorFocus:  function (dispatch, element) {
        dispatch({ type: 'SET_EDITOR_FOCUS', payload: element });
    },
    
    ClearData: function (dispatch) {
        console.log('ClearData');
        SystemNotification.SetEmailID(dispatch,-1);
        SystemNotification.SetActiveContent(dispatch, []);
        SystemNotification.ActiveEditor(dispatch, '');
        
    },
    ActiveEditor:  function (dispatch, activeEditor) {
        dispatch({ type: 'SET_ACTIVE_EDITOR', payload: activeEditor });
    },
    EditorChange:  function (dispatch, editorChange) {
        dispatch({ type: 'SET_EDITOR_CHANGE', payload: editorChange });
    },
    SetDataFields:  function (dispatch, dataFields) {
        dispatch({ type: 'SET_DATA_FIELDS', payload: dataFields });
    }

    


    
}

export default SystemNotification;