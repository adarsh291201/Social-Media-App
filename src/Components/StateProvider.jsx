import react, { createContext, useContext, useReducer } from "react"
import reducer, { initialState } from './Reducer.jsx'


//Creating datalayer which holds data
export const StateContext = createContext();

export const StateProvider = ({ children}) => {
    const [state, dispatch] = useReducer(reducer,initialState);
    return(
    <StateContext.Provider value={[state, dispatch]}>
            {children}
    </StateContext.Provider>
    )
}

export const useStateValue=()=> useContext(StateContext)











// import React, { createContext, useContext, useReducer } from 'react'
// import reducer,{ initialState } from './Reducer';

// export const StateContext =createContext();

//This Statecontext is a data layer which actaully holds data.

// export const StateProvider = ({reducer,initialState,children}) =>{
//     <StateContext.Provider value = {useReducer(reducer,initialState)}>
//         {children}
//     </StateContext.Provider>
// }
// export const StateProvider=({children})=>{
//     const [{state},dispatch]= useReducer(reducer,initialState)
//     return (
//         <StateContext.Provider value={{state,dispatch}}>{children}</StateContext.Provider>
//     );
// };

// export const useStateValue =() => useContext(StateContext);