import React, {createContext, useReducer} from "react";
import Reducer from './reducer'

let initialState = {
    activeTemplate: -1,
    applicationCode : '',
    busy: false,
    code: '',
    codeTitle: '',
    emailTypeID: -1,
    emailTypeList: [],
    emailList :[],
    emailId: -1,
    editArea: '',
    notification : '',
    secureApplication:'',
    secureUser:''



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