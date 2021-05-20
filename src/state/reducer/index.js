const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_TEMPLATE':
            return {
                ...state,
                activeTemplate: action.payload
            };

        case 'SET_ACTIVE_MENU':
            return {
                ...state,
                activeMenu: action.payload
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'SET_EMAILS':
            return {
                ...state,
                emails: action.payload
            };
        case 'SET_ACTIVE_EMAIL':
            return {
                ...state,
                email: action.payload
            };
        case 'SET_CODE_EDITOR':
            return {
                ...state,
                codeEditor: action.payload
            };
        case 'SET_SERVICE_ERROR':
            return {
                ...state,
                serviceError: action.payload
            };

        case 'SET_ACTIVE_CONTENT':
            return {
                ...state,
                emailContent: action.payload
            };

        case 'SET_APPLICATION':
            return {
                ...state,
                application: action.payload
            };

        case 'SET_CHANGED_CONTENT':
            return {
                ...state,
                emailChanged: action.payload
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
        default:
            return state;
    }
};

export default Reducer;