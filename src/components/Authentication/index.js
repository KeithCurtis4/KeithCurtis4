import React, { useContext, useEffect } from 'react'
import { Context } from '../../state';
import Config from '../../common/config'
import Service from '../../services'
import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const Authentication = () => {
  const [state, dispatch] = useContext(Context);
  const values = queryString.parse(document.location.search);
  const location = useLocation()
  const history = useHistory()

  const [cookies, setCookie] = useCookies(['name']);
 

  const Authenticate = () => {
    var needsAuthentication = false;
    var authenticated = false;
    
    if((values.AuthenticationKey!==undefined &&  values.Application!==undefined))
    {
      var dAuthenticationKey =  Service.decodeData(values.AuthenticationKey);
      var dApplication =  Service.decodeData(values.Application);

      
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      setCookie('secureUser', dAuthenticationKey, { path: '/', expires: tomorrow });
      setCookie('secureApplication', dApplication, { path: '/', expires: tomorrow });

      authenticated =true;
      
      const queryParams = new URLSearchParams(location.search)

      if (queryParams.has('Application')) {
        
        queryParams.delete('Application')
        queryParams.delete('AuthenticationKey')
        history.replace({
          search: queryParams.toString(),
        })
      }
    }
 
    //cookies not set
    if(!cookies.secureUser || !cookies.secureApplication) {
      needsAuthentication=true;
    }
    
    //different application
    if(cookies.secureApplication !== state.applicationCode) 
      needsAuthentication=true;

    
    if(needsAuthentication===true && authenticated==false)
    {
      const returnURL = btoa(Service.encodeData(document.location.href));
      const endPointURL = Config.apiK2Authentication.concat('?','ApplicationCode=', state.applicationCode , '&ReturnURL=',returnURL);
     
      document.location = endPointURL;
    }

  };

  useEffect(() => {
    if (state.applicationCode)
    {
      Authenticate();
    }

  }, [state.applicationCode]);

  return (<div></div>);

};

export default React.memo(Authentication);