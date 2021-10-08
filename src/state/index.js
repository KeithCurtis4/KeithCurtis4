import React, {createContext, useReducer} from "react";
import Reducer from './reducer'

let initialState = {
    applicationCode : '',
    busy: false,
    code: '',
    codeTitle: '',
    dataFields: [],
    emailTypeID: -1,
    emailTypeList: [],
    emailList :[],
    emailId: -1,
    editArea: '',
    notification : '',
    secureApplication:'',
    secureUser:'',
    //Current area being edited
    activeEditor:'',
    //code editor being changd
    editorChange:
    {
        activeEditor: '',
        code: ''
    }
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