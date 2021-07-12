import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Store from './state'
import SnackbarProvider from 'react-simple-snackbar'
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import ApplicationPage from './pages/applicationPage'
import MainPage from './pages'



function App() {

  function Application() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { appCode } = useParams();
   
    return (
      <ApplicationPage appCode={appCode} /> 
    );
  }

  return (
    <Store> 
      <CookiesProvider>
       <SnackbarProvider>
        <Router>
          <Switch>
            <Route path="/:appCode" children={<Application />} />
            <Route path="/" children={<MainPage />}/>
          </Switch>
      </Router>
      </SnackbarProvider>
      </CookiesProvider>
    </Store>
  );
}

export default App;
