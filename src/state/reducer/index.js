const Reducer = (state, action) => {
   
    switch (action.type) {
        case 'SET_APPLICATION_CODE':
            return {
                ...state,
                applicationCode: action.payload
            };

        case 'SET_EMAIL_TYPE_LIST':
            return {
                ...state,
                emailTypeList: action.payload
            };

        case 'SET_EMAIL_TYPE_ID':
            return {
                ...state,
                emailTypeID: action.payload
            };

        case 'SET_EMAIL_LIST':
            return {
                ...state,
                emailList: action.payload
            };

        case 'SET_EMAIL_ID':
            return {
                ...state,
                emailId: action.payload
            };
        
        case 'SET_ACTIVE_MENU':
            return {
                ...state,
                activeMenu: action.payload
            };

        case 'SET_CODE_EDITOR':
            return {
                ...state,
                codeEditor: action.payload
            };
        case 'SET_BUSY':
            return {
                ...state,
                busy: action.payload
            };

        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: action.payload
            };

        case 'SET_NOTIFICATION_ERROR':
            return {
                ...state,
                notificationError: action.payload
            };

        case 'SET_NOTIFICATION_OK':
            return {
                ...state,
                notificationOK: action.payload
            };
        case 'SET_SECURE_USER':
            return {
                ...state,
                secureUser: action.payload
            };

        case 'SET_SECURE_APPLICATION':
            return {
                ...state,
                secureApplication: action.payload
            };

        case 'SET_ACTIVE_EDITOR':
            return {
                ...state,
                activeEditor: action.payload
            };
        case 'SET_ACTIVE_CONTENT':
        return {
            ...state,
            activeContent: action.payload
        };
        case 'SET_EDITOR_CHANGE':
            return {
                ...state,
                editorChange: action.payload
            };
        case 'SET_EDITOR_FOCUS':
            return {
                ...state,
                editorFocus: action.payload
            };
        case 'SET_DATA_FIELDS':
        return {
            ...state,
            dataFields: action.payload
        };

            

        
        default:
            return state;
    }
};

export default Reducer;