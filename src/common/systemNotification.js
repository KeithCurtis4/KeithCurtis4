const SystemNotification = {
    ActiveTemplate: function (dispatch, data) {
        dispatch({ type: 'SET_ACTIVE_CONTENT', payload: data });
    },
    ActiveMenu: function (dispatch, data) {
        dispatch({ type: 'SET_ACTIVE_MENU', payload: data });
    },
    SetEmails: function (dispatch, data) {
        dispatch({ type: 'SET_EMAILS', payload: data });
    },
    ActiveEmail: function (dispatch, id) {
        dispatch({ type: 'SET_ACTIVE_EMAIL', payload: id });
    },
    SetCodeEditor: function (dispatch, data) {
        dispatch({ type: 'SET_CODE_EDITOR', payload: data });
    },
    SetActiveContent: function (dispatch, data) {
        dispatch({ type: 'SET_ACTIVE_CONTENT', payload: data });
    },
    SetApplication: function (dispatch, appCode) {
        dispatch({ type: 'SET_APPLICATION', payload: appCode });
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
    }
}

export default SystemNotification;