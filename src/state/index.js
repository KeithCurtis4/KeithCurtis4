import React, {createContext, useReducer} from "react";
import Reducer from './reducer'
import data from '../assets/json/data.json'

let initialState = {
    application : '',
    emails: [],
    error: null,
    serviceError : '',
    emailContent :[],
    busy: false,
    notification : '',
    activeTemplate: -1
};

const Store = ({children}) => {
   const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;