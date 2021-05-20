import fetchJsonp from 'fetch-jsonp';

export const GetURLData = (url, dispatch, onCompleted, returnObj,parse=true) => {
    var data=[];

   const setBusy = (busy) => {
        dispatch({ type: 'SET_BUSY', payload: busy });
    };

    const setErrorNotificationError = (msg) => {
        dispatch({ type: 'SET_NOTIFICATION_ERROR', payload: msg.toString() });
    };

    setBusy(true);

    try {
        fetchJsonp(url)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                if(parse)
                    data = JSON.parse(json.data);
                else
                    data = json;
                onCompleted(data, returnObj);
            }).catch(function (ex) {
                setErrorNotificationError(ex);
            });
    }
    catch (e) {
        setErrorNotificationError('Error loading application')
    }

    setBusy(false);

    //do not need this
    return[data];
}