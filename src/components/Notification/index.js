import { reduce } from 'lodash-es';
import React, { useContext, useEffect } from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { Context } from '../../state';

const Notification = () => {
  const [state, dispatch] = useContext(Context);


  const optionsNotificaiton = {
    position: 'bottom-right',
    style: {
      color: 'white',
      fontSize: '16px',
      textAlign: 'center',
      width: '100px'
      },
    closeStyle: {
      color: 'white',
      fontSize: '10px',
    }
  }

  const optionsError = {
    position: 'bottom-right',
    style: {
      color: 'white',
      backgroundColor: '#a1080b',
      fontSize: '16px',
      textAlign: 'center',
      width: '100px'
      },
    closeStyle: {
      color: 'white',
      fontSize: '10px',
    }
  }

  const optionsOK = {
    position: 'bottom-right',
    style: {
      color: 'white',
      backgroundColor: 'green',
      fontSize: '16px',
      textAlign: 'center',
      width: '100px'
      },
    closeStyle: {
      color: 'white',
      fontSize: '10px',
    }
  }

  const [openSnackbar, closeSnackbar] = useSnackbar(optionsNotificaiton);
  const [openSnackbarError, closeSnackbarError] = useSnackbar(optionsError);
  const [openSnackbarOK, closeSnackbarOK] = useSnackbar(optionsOK);
  
  useEffect(() => {
    if (state.notification)
      openSnackbar(state.notification)
  }, [state.notification]);

  useEffect(() => {
    if (state.notificationError)
    openSnackbarError(state.notificationError)
  }, [state.notificationError]);

  useEffect(() => {
    if (state.notification)
    openSnackbarOK(state.notificationOK)
  }, [state.notificationOK]);


  return (<div></div>);

};

export default React.memo(Notification);