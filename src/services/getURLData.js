import fetchJsonp from 'fetch-jsonp';

export const GetURLData = (url, dispatch, onCompleted, returnObj,parse=true) => {
    var data=[];

   const setBusy = (busy) => {
        dispatch({ type: 'SET_BUSY', payload: busy });
    };

    const setErrorNotificationError = (msg) => {
        dispatch({ type: 'SET_NOTIFICATION_ERROR', payload: msg.toString() });
    };

    const parseJSON = (json) => {
       
        var result = [];
        var data =  json.data.replaceAll('\\', '');
        try{
           result = JSON.parse(data);
         }
        catch(e)
        {
            setErrorNotificationError(e);
        }

        return result;
    }

    setBusy(true);

    try {
        fetchJsonp(url, {
            timeout: 10000,
          })
            .then(function (response) {
                setBusy(false);
                return response.json();
            }).then(function (json) {
               
                if(parse){
                    data = parseJSON(json);}
                else{
                    data = json;}

                onCompleted(data, returnObj);  

            }).catch(function (ex) {
                setErrorNotificationError(ex);
            });
    }
    catch (e) {
        setErrorNotificationError('Error loading application')
    }

   

    //do not need this
    return[data];
}